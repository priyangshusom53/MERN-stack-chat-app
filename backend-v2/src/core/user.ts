
type link = string
type contact = string

export class User {
   id: string;
   name: string;
   email: string;
   password: string;
   profilePic: link | null;
   contacts: contact[] | null;
   blockedContacts: contact[] | null;
   about: string | null;
   age: number | null;
   gender: string | null;
   createdAt: Date;

   constructor(id: string, name: string, email: string, password: string, createdAt: Date, profilePic?: link, contacts?: contact[], blockedContacts?: contact[], about?: string, age?: number, gender?: string) {
      this.id = id
      this.name = name
      this.email = email
      this.password = password
      this.createdAt = createdAt
      this.profilePic = profilePic ? profilePic : null
      this.contacts = contacts ? contacts : null
      this.blockedContacts = blockedContacts ? blockedContacts : null
      this.about = about ? about : null
      this.age = age ? age : null
      this.gender = gender ? gender : null
   }
}