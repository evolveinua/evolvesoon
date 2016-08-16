window.onload = function() {
  
  let headArea = document.getElementById('canvas');

  let windowWidth,
      windowHeight;
  
  function setHeaderSize() {
    
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    
    headArea.style.width = windowWidth + 'px';
    headArea.style.height = windowHeight + 'px';
    
  }

  function setHeaderColor() {
    
    headArea.style.backgroundColor = '#FACC13';
  
  }
  
  setHeaderSize();
  setHeaderColor();

}