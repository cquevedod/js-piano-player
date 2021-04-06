keys.forEach((key) => {
  key.addEventListener('mousedown', playOnMouseDown);
  key.addEventListener('mouseup', fadeOnMouseUp);
  key.addEventListener('touchstart', playOnTouchStart);
  key.addEventListener('touchend', fadeOnTouchEnd);
});

document.addEventListener('keydown', playOnKeyDown);
document.addEventListener('keyup', FadeOnKeyUp);

/* --show musical notes when mousedown, keydown or touch a key----*/
document.addEventListener('keydown', showMusicalNotes);
document.addEventListener('mousedown', showMusicalNotes);
document.addEventListener('touchstart', showMusicalNotes);
   




