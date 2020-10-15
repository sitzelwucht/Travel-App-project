
// Define modals and collapsibles

const notesModal = document.getElementById("modal-notes");
const clearModal = document.getElementById("modal-clear");

const coll = document.getElementsByClassName("collapsible");

for (let i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}

document.getElementById("btn-notes").addEventListener('click', () => {
    notesModal.style.display = 'block';
    closeModalX(notesModal, 0)
    closeModal(notesModal)
})

document.getElementById("removeAll").addEventListener('click', () => {
  clearModal.style.display = 'block';
  closeModalX(clearModal, 1)
  closeModal(clearModal)
})


const closeModalX = (modal, i) => {
  document.getElementsByClassName("close")[i].onclick = function() {
      modal.style.display = "none";
    }
  }

const closeModal = (modal) => {
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      }
    }
  }
