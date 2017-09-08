const bcrypt = require("bcrypt-nodejs");

let record = {
	masterdetective123: {
		id: "1",
		username: "a",
		FirstName: "Sherlock",
		LastName : "Holmes",
		Profession: "Detective",
		Bio: "Sherlock Holmes (/ˈʃɜːrlɒk ˈhoʊmz/) is a fictional private detective created by British author Sir Arthur Conan Doyle. Known as a \"consulting detective\" In the stories, Holmes is known for a proficiency with observation, forensic science, and logical reasoning that borders on the fantastic, which he employs when investigating cases for a wide variety of clients, including Scotland Yard.",
		Password: "$2a$06$SYH3q8JOwSZX4YOOv3WxT.3YJBxyw96kjAsRJQ0Gf4.Ff2HEUmoRi"
	},
	lemon: {
		id: "2",
		username: "lemon",
		FirstName: "Elizabeth",
		LastName : "Lemon",
		Profession: "Writer",
		Bio: "Elizabeth Miervaldis \"Liz \"Lemon is the main character of the American television series 30 Rock. She created and writes for the fictional comedy-sketch show The Girlie Show or TGS with Tracy Jordan.",
		Password: "$2a$06$aYVIHNTarWhW50xKYXMU2ODi1I3Tai6p3UrpfLohEghz.Srhcxdda"
		},
	theboywholived: {
		id: "3",
		username: "theboywholived",
		FirstName: "Harry",
		LastName : "Potter",
		Profession: "Student",
		Bio: "Harry Potter is a series of fantasy novels written by British author J. K. Rowling. The novels chronicle the life of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry . The main story arc concerns Harry's struggle against Lord Voldemort, a dark wizard who intends to become immortal, overthrow the wizard governing body known as the Ministry of Magic, and subjugate all wizards and Muggles.",
		Password: "$2a$06$DJZoimRYuQNKH2yWjPAHFe5u0fe0JZPAbNBfNEQ.e4ZMzOtTBDTa6"
		}
};

module.exports = {
getUserInfo: (userName) => {
	return record[userName];
},

findUserName: (username, password) => {
	
	let user = record[username];
	if (!user) {
		return {
			result: false,
			message: "username is not found"
		};
	}
	
	if (!bcrypt.compareSync(password, user.Password)){
		return {
			result: false,
			message: "password is wrong."
		}
	}
  	
	  	return {
			result: true,
			message: `${username} ${password}`
		};
	}
}