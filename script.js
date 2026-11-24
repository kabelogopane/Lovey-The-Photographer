const menuButton=document.querySelector(".menu-toggle");
const navigation=document.querySelector(".main-nav");
if(menuButton&&navigation){
  menuButton.addEventListener("click",()=>{
    const open=navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded",String(open));
    menuButton.setAttribute("aria-label",open?"Close menu":"Open menu");
  });
  navigation.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded","false");
    menuButton.setAttribute("aria-label","Open menu");
  }));
}
const year=document.querySelector("#year");
if(year)year.textContent=new Date().getFullYear();

const bookingForm=document.querySelector("#booking-form");
if(bookingForm){
  bookingForm.addEventListener("submit",event=>{
    event.preventDefault();
    const name=document.querySelector("#client-name").value.trim();
    const session=document.querySelector("#session-type").value;
    const details=document.querySelector("#session-message").value.trim();
    if(!name||!session){alert("Please enter your name and choose what you have in mind.");return;}
    const message=["Hello Lovey The Photographer!","","I'd like to enquire about a photography session.","Name: "+name,"Enquiry: "+session,"Details: "+(details||"I'd like to discuss the details.")].join("\n");
    window.open("https://wa.me/27677504303?text="+encodeURIComponent(message),"_blank","noopener,noreferrer");
  });
}

const galleryImages=[...document.querySelectorAll(".photo-open")];
const lightbox=document.querySelector("#lightbox");
const lightboxImage=document.querySelector(".lightbox-image");
const lightboxCount=document.querySelector(".lightbox-count");
let activeImage=0;
let previousFocus=null;
function showImage(index){
  activeImage=(index+galleryImages.length)%galleryImages.length;
  const button=galleryImages[activeImage];
  const image=button.querySelector("img");
  lightboxImage.src=image.src;
  lightboxImage.alt=image.alt;
  lightboxCount.textContent=String(activeImage+1).padStart(2,"0")+" / "+String(galleryImages.length).padStart(2,"0");
}
function openLightbox(index){
  previousFocus=document.activeElement;
  showImage(index);
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden","false");
  document.body.style.overflow="hidden";
  lightbox.querySelector(".lightbox-close").focus();
}
function closeLightbox(){
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden","true");
  document.body.style.overflow="";
  if(previousFocus)previousFocus.focus();
}
galleryImages.forEach(button=>button.addEventListener("click",()=>openLightbox(Number(button.dataset.index))));
lightbox.querySelector(".lightbox-close").addEventListener("click",closeLightbox);
lightbox.querySelector(".lightbox-prev").addEventListener("click",()=>showImage(activeImage-1));
lightbox.querySelector(".lightbox-next").addEventListener("click",()=>showImage(activeImage+1));
lightbox.addEventListener("click",event=>{if(event.target===lightbox)closeLightbox();});
document.addEventListener("keydown",event=>{
  if(!lightbox.classList.contains("is-open"))return;
  if(event.key==="Escape")closeLightbox();
  if(event.key==="ArrowLeft")showImage(activeImage-1);
  if(event.key==="ArrowRight")showImage(activeImage+1);
});