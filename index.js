var testLog = function(txt){
	console.log(txt)
}

/**
	@param txt {type: "text"} Nom du giveaway.
	@param t {type: "number"} Temps du giveaway.
	@param msg {type: "Message"} Message sur Discord.
*/
var giveaways = function (txt, t, msg) {
	if(txt==undefined||txt==null){console.error("Argument non défini."); return ;}
	if(t==undefined||t==null){console.error("Argument non défini."); return ;}
	if(msg==undefined||msg==null){console.error("Argument non défini."); return ;}
	
	msg.edit({embed:{
		thumbnail: {url: "https://media.discordapp.net/attachments/462546170770620416/473103848261550090/Horloge.gif"},
		color: 0,
		description: txt+"\n\nTemps restant : "+t+"s",
	}})
	
	if(t<=0){
		if(msg.reactions.map(g=>g).filter(x=>x._emoji.name=="🎉")[0]!=undefined&&msg.reactions.map(g=>g).filter(x=>x._emoji.name=="🎉")[0].users.map(g=>g.id).filter(x=>x!="445157515802443778").length!=0){
			let participants = msg.reactions.map(g=>g).filter(x=>x._emoji.name=="🎉")[0].users.map(g=>g.id).filter(x=>x!="445157515802443778")
			let gg = participants[Math.floor(Math.random()*participants.length)]
			
			msg.edit({embed:{
				color: 255,
				title: "Fin !",
				description: txt+"\n\nGagnant : <@"+gg+">",
			}})
			msg.channel.send("<@"+gg+">").then(msg=>{setTimeout(function(){msg.delete()}, 500)})
		} else {
			msg.channel.send("Pas de gagnant !").then(msg=>{setTimeout(function(){msg.delete()}, 500)})
			
			msg.edit({embed:{
				color: 255,
				title: "Fin !",
				description: txt+"\n\nPas de gagnant !",
			}})
		}
	} else {
		let tt = t - 5
		setTimeout(function(){giveaways(txt, tt, msg)}, 5000)
	}
}

module.exports = {
	testLog: testLog,
	place: function(){
		return this.process.mainModule.filename
	},
	giveaways: giveaways,
}
