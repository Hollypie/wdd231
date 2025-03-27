const getString = window.location.search;
const urlParams = new URLSearchParams(getString);
console.log(getString);

const myInfo = new URLSearchParams(getString);
console.log(myInfo);



document.querySelector('#results').innerHTML = `
<p>Appointment for ${myInfo.get('first')} ${myInfo.get('last')}</p>
<p>Proxy ${myInfo.get('ordinance')} on ${myInfo.get('date')} in the ${myInfo.get('location')}</p>
<p>Your Phone: ${myInfo.get('phone')} </p>
<p>Your Email Address: ${myInfo.get('email')}</p>
`;
