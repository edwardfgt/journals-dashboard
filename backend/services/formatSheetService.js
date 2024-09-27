const convertGoogleSheetsData = (data) => {
    const [headers, ...rows] = data;
    const clientData = {};
  
    rows.forEach(row => {
      const [monthYear, clientName, , , sparkloop, beehiivBoosts, sponsorship, , , affiliate] = row;
  
      if (!clientData[clientName]) {
        clientData[clientName] = [];
      }
  
      const [month, year] = monthYear.split(' ');
      const date = new Date(`${year}-${month}-01`).toISOString().split('T')[0];
  
      const entry = {
        date,
        Sparkloop: parseFloat(sparkloop.replace('$', '').replace(',', '')),
        'Beehiiv Boosts': parseFloat(beehiivBoosts.replace('$', '').replace(',', '')),
        'advertising revenue': parseFloat(sponsorship.replace('$', '').replace(',', '')),
        'affiliate revenue': parseFloat(affiliate.replace('$', '').replace(',', ''))
      };
  
      clientData[clientName].push(entry);
    });
  
    return clientData;
  };
  
  module.exports = convertGoogleSheetsData;