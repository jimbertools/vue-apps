module.exports = {
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    select: null,
    items: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4',
    ],
    countries: [
      'Afghanistan',
      'Albania',
      'Algeria',
      'Andorra',
      'Angola',
      'Antigua and Barbuda',
      'Argentina',
      'Armenia',
      'Australia',
      'Austria',
      'Azerbaijan',
      'The Bahamas',
      'Bahrain',
      'Bangladesh',
      'Barbados',
      'Belarus',
      'Belgium',
      'Belize',
      'Benin',
      'Bhutan',
      'Bolivia',
      'Bosnia and Herzegovina',
      'Botswana',
      'Brazil',
      'Brunei',
      'Bulgaria',
      'Burkina Faso',
      'Burundi',
      'Cabo Verde',
      'Cambodia',
      'Cameroon',
      'Canada',
      'Central African Republic',
      'Chad',
      'Chile',
      'China',
      'Colombia',
      'Comoros',
      'Congo, Democratic Republic of the',
      'Congo, Republic of the',
      'Costa Rica',
      'Côte d’Ivoire',
      'Croatia',
      'Cuba',
      'Cyprus',
      'Czech Republic',
      'Denmark',
      'Djibouti',
      'Dominica',
      'Dominican Republic',
      'East Timor (Timor-Leste)',
      'Ecuador',
      'Egypt',
      'El Salvador',
      'Equatorial Guinea',
      'Eritrea',
      'Estonia',
      'Eswatini',
      'Ethiopia',
      'Fiji',
      'Finland',
      'France',
      'Gabon',
      'The Gambia',
      'Georgia',
      'Germany',
      'Ghana',
      'Greece',
      'Grenada',
      'Guatemala',
      'Guinea',
      'Guinea-Bissau',
      'Guyana',
      'Haiti',
      'Honduras',
      'Hungary',
      'Iceland',
      'India',
      'Indonesia',
      'Iran',
      'Iraq',
      'Ireland',
      'Israel',
      'Italy',
      'Jamaica',
      'Japan',
      'Jordan',
      'Kazakhstan',
      'Kenya',
      'Kiribati',
      'Korea, North',
      'Korea, South',
      'Kosovo',
      'Kuwait',
      'Kyrgyzstan',
      'Laos',
      'Latvia',
      'Lebanon',
      'Lesotho',
      'Liberia',
      'Libya',
      'Liechtenstein',
      'Lithuania',
      'Luxembourg',
      'Madagascar',
      'Malawi',
      'Malaysia',
      'Maldives',
      'Mali',
      'Malta',
      'Marshall Islands',
      'Mauritania',
      'Mauritius',
      'Mexico',
      'Micronesia, Federated States of',
      'Moldova',
      'Monaco',
      'Mongolia',
      'Montenegro',
      'Morocco',
      'Mozambique',
      'Myanmar (Burma)',
      'Namibia',
      'Nauru',
      'Nepal',
      'Netherlands',
      'New Zealand',
      'Nicaragua',
      'Niger',
      'Nigeria',
      'North Macedonia',
      'Norway',
      'Oman',
      'Pakistan',
      'Palau',
      'Panama',
      'Papua New Guinea',
      'Paraguay',
      'Peru',
      'Philippines',
      'Poland',
      'Portugal',
      'Qatar',
      'Romania',
      'Russia',
      'Rwanda',
      'Saint Kitts and Nevis',
      'Saint Lucia',
      'Saint Vincent and the Grenadines',
      'Samoa',
      'San Marino',
      'Sao Tome and Principe',
      'Saudi Arabia',
      'Senegal',
      'Serbia',
      'Seychelles',
      'Sierra Leone',
      'Singapore',
      'Slovakia',
      'Slovenia',
      'Solomon Islands',
      'Somalia',
      'South Africa',
      'Spain',
      'Sri Lanka',
      'Sudan',
      'Sudan, South',
      'Suriname',
      'Sweden',
      'Switzerland',
      'Syria',
      'Taiwan',
      'Tajikistan',
      'Tanzania',
      'Thailand',
      'Togo',
      'Tonga',
      'Trinidad and Tobago',
      'Tunisia',
      'Turkey',
      'Turkmenistan',
      'Tuvalu',
      'Uganda',
      'Ukraine',
      'United Arab Emirates',
      'United Kingdom',
      'United States',
      'Uruguay',
      'Uzbekistan',
      'Vanuatu',
      'Vatican City',
      'Venezuela',
      'Vietnam',
      'Yemen',
      'Zambia',
      'Zimbabwe',
    ],
    checkbox: false,
    lazy: false,
    country: "",
    referredBy: "",
    seed: "",
    referredByError: [],
    countryError: [],
    seedError: [],
    doubleName: "mdw95.3bot"
  }),

  methods: {
    async initialize3Bot() {

      if (!this.country) {
        this.countryError.push("Please select a country.")
        return
      }

      var userDataResponse
      try {
        userDataResponse = (await window.apiService.getPublickey(this.doubleName))
      } catch (error) {
        console.log(error)
        // this.referredByError.push("Could not find name.")
        return
      }

      var referredUserDataResponse
      if (this.referredBy) {
        try {
          referredUserDataResponse = (await window.apiService.getPublickey(this.referredBy))
        } catch (error) {
          console.log(error)
          this.referredByError.push("Could not find referred name.")
          return
        }
      }

      var userDataKeys
      
      if (this.seed) {
        try {
          this.seed = this.seed.replace(/[^a-zA-Z ]/g, "").toLowerCase().trim().replace(/\s\s+/g, ' ')
          userDataKeys = await this.generateKeys(this.seed)
        } catch (error) {
          console.log(error)
          this.seedError.push("Your seed phrase is invalid.")
          return
        }
      } else {
        this.seedError.push("Please enter your seed.")
        return
      }

      console.log('userDataResponse.data.publicKey :', userDataResponse.data.publicKey);
      console.log('userDataKeys.publicKey :', userDataKeys.publicKey);

      if(userDataResponse.data.publicKey === userDataKeys.publicKey) {
        console.log("We can now initialize ... ")
      }
    },

    generateKeys(phrase) {
      return new Promise(async (resolve, reject) => {
        await sodium.ready;

        try {
          var entropy = bip39.mnemonicToEntropy(phrase)

          const fromHexString = hexString => new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)))

          var keys = sodium.crypto_sign_seed_keypair(fromHexString(entropy))

          resolve({
            phrase,
            privateKey: nacl.util.encodeBase64(keys.privateKey),
            publicKey: nacl.util.encodeBase64(keys.publicKey)
          })
        } catch (error) {
          reject(error)
        }
      })
    }
  },
}