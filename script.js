const addBtn = document.querySelector('#add');
    const updateLSData = ()=>{
        const textAreaData = document.querySelectorAll('textarea');
        const notes = [];
        textAreaData.forEach((note)=>{
            return notes.push(note.value);
        })
        localStorage.setItem('notes', JSON.stringify(notes));
    }
    const addNewNote = (text = '') =>{
        const note = document.createElement('div');
        note.classList.add('note');
        const htmlData = `
       <div class="operation">
           <button class="edit"><i class="fa fa-edit"></i></button>
           <button class="delete"><i class="fa fa-trash"></i></button>
       </div>
       <div class="main ${text ? "":"hidden"} "></div>
       <textarea class="${text ? "hidden":""}"></textarea>
   </div> `;

        note.insertAdjacentHTML('afterbegin',htmlData);

        // get reference
        const editBtn = note.querySelector('.edit');
        const delBtn = note.querySelector('.delete');
        const mainDiv = note.querySelector('.main');
        const textarea = note.querySelector('textarea');

        //delete the note
        delBtn.addEventListener('click', () =>{
            note.remove();
            updateLSData();
        })
       
        // edit the note - toggle
        textarea.value = text;
        mainDiv.innerHTML = text;
        editBtn.addEventListener('click',()=>{
            mainDiv.classList.toggle('hidden');
            textarea.classList.toggle('hidden');
        })
        
        textarea.addEventListener('change',(event)=>{
            const val = event.target.value;
            mainDiv.innerHTML = val;

            
            updateLSData(); //localstorage data
        })
        
        document.body.appendChild(note);
    }
    //get data from local storage
const notes = JSON.parse(localStorage.getItem('notes'));

if(notes){notes.forEach((note)=>addNewNote(note))};

    addBtn.addEventListener('click',()=>addNewNote());
