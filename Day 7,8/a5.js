var library = [
    { 
        title: 'The Road Ahead',
         author: 'Bill Gates',
          libraryID: 1254
   }, 
   { 
       title: 'Walter Isaacson',
        author: 'Steve Jobs',
         libraryID: 4264 
   }, 
   { 
       title: 'Mockingjay: The Final Book of The Hunger Games',
        author: 'Suzanne Collins', 
        libraryID: 3245 
   }
]; 
var li=[]
var out=[]
for(i in library)
{
   li.push(library[i].libraryID);
}

li.sort((a,b)=>(b-a));

for(var j in li)
{
   for(var k in library)
   {
       if(li[j]===library[k].libraryID)
       {
           out.push(library[k]);
       }
   }
}
console.log(out);