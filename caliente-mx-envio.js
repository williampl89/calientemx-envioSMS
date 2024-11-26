// Import required libraries
const hubspot = require('@hubspot/api-client');
const axios = require('axios')

exports.main = (event, callback) => {

	const hubspotClient = new hubspot.Client({
		apiKey: process.env.HAPIKEY
	});

	hubspotClient.crm.contacts.basicApi.getById(event.object.objectId, ["email", "mobilephone", "winteo"]).then(results => {

		let contactemail = results.body.properties.email;
		let contactmobilephone = results.body.properties.mobilephone;
		

		let cadena1 = 'Regresa este 2022 a jugar los. ';		
		let cadena2 = ' BNRs de regalo que tenemos para ti en Caliente Casino. Vuelve a divertirte con nosotros y gana.';
		let winteocad = results.body.properties.winteo;
		let contactomensaje = cadena1 + winteocad + cadena2;

		axios.post('https://api1.calixtaondemand.com/Controller.php/__a/sms.send.remote.ol.sa?cte=1234&encpwd=560c4cff9babc211234d&email='+contactemail+'&mtipo=SMS&numtel='+contactmobilephone+'&msg='+contactomensaje+'&json=1',
			)
		.then(response => {
			console.log(response.data);
			
		});
	});
}