var generateMessage = (from,text)=>{
    return{
        from,
        text,
        createdAt: new Date().getDate()
    }
};

var generateLocationMessage = (from,lat,long)=>{
  return{
      from,
      url:`https://www.google.com/maps?q=${lat},${long}`
  }
};

module.exports = {generateMessage,generateLocationMessage};