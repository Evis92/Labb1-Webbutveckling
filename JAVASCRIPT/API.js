
const uri = 'https://api.open-meteo.com/v1/forecast?latitude=15.5055&longitude=-61.2788&current=temperature_2m,is_day,rain&timezone=auto';


fetch(uri)
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log(data);
    const temperature = data.current.temperature_2m;
        const temperatureElement = document.getElementById('current_temperature');
        temperatureElement.textContent = `Current temperature: ${temperature}°C`;

    const time = data.current.time;
    const formattedTime = new Date(time).toLocaleString('en-GB', { 
      hour: '2-digit', 
      minute: '2-digit', 
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    const timeElement = document.getElementById('current_time');
    timeElement.textContent = `Local time: ${formattedTime}`;

});
  









