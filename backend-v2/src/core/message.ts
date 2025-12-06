
type link = string

export class Message {
   id: string;
   text: string;
   media: link | null;
   sender: string;
   receiver: string;
   time: Date;

   constructor(id: string, sender: string, receiver: string, time: Date, text: string, media?: link) {
      this.id = id
      this.text = text;
      this.media = media ? media : null;
      this.sender = sender
      this.receiver = receiver
      this.time = time
   }
}