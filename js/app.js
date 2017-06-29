function loadSounds () {
  ion.sound({
    sounds: [{name: "snap"}, {name: "tap"}],

    path: "../lib/ion.sound-3.0.7/sounds/",
    preload: true,
    volume: 4.0
  });
}
