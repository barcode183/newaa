function get(index) {return UI.GetValue("Script items", index)}
function enable(index) {UI.SetEnabled("Script items", index, true)}
function disable(index) {UI.SetEnabled("Script items", index, false)}
function math(int) {return Math.floor(Math.random() * Math.floor(int) * 1.2)}
function string(index) {return UI.GetString("Script items", index)}
/* Script by Cyprus
Configs at: https://shoppy.gg/@Cyprus
feel free to modify the script
Please do give me credit though.
*/
UI.AddLabel("AA Presets by Cyprus");
UI.AddCheckbox("Randomize Yaw");
UI.AddSliderInt("Yaw Offset", -180, 180);
UI.AddCheckbox("Randomize Jitter");
UI.AddSliderInt("Jitter Offset", -180, 180);
UI.AddSliderInt("Randomization Speed", 0, 10)
UI.AddDropdown("Presets", ["None", "Low Delta", "Edging"]);
UI.AddCheckbox("Set Original Settings");
const originalYaw = UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset");
const originalJitter = UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset");
status = 0;
jstatus = 0;
function move() {[/CENTER]
var preset = string("Presets")

[CENTER]  amount = get("Randomization Speed") * 5
  status++;
  jstatus++;
  if(get("Randomize Yaw")) {
    if(status >= amount) {
    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", math(get("Yaw Offset")));
    status = 0;
    }
  }
  if(get("Randomize Jitter")) {
    if(jstatus >= amount) {
    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", math(get("Jitter Offset")));
    jstatus = 0;
    }
  }
  if(string("Presets") == "Low Delta") {
    AntiAim.SetOverride(1);
    if(UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter")) {
      AntiAim.SetFakeOffset(4);
      AntiAim.SetRealOffset(-12);
      AntiAim.SetLBYOffset(16);
    }
    else {
      AntiAim.SetFakeOffset(-4);
      AntiAim.SetRealOffset(12);
      AntiAim.SetLBYOffset(-16);
    }
  }
  else if(string("Presets") == "Edging") {
    if(UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter")) {
      AntiAim.SetFakeOffset(35);
      AntiAim.SetRealOffset(25);
      AntiAim.SetLBYOffset(-80);
    }
    else {
    AntiAim.SetFakeOffset(35);
    AntiAim.SetRealOffset(35);
    AntiAim.SetLBYOffset(80);
    }
  }
  else if(string("Presets") == "None") {
    AntiAim.SetOverride(0);
  }
}
function draw() {
  if(get("Set Original Settings")) {
    reset();
    UI.SetValue("Script items", "Set Original Settings", false);
  }
}
function reset() {
  UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", originalYaw);
  UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", originalJitter);
  UI.SetValue("Script items", "Randomize Yaw", false);
  UI.SetValue("Script items", "Randomize Jitter", false);
  UI.SetValue("Script items", "Yaw Offset", 0);
  UI.SetValue("Script items", "Jitter Offset", 0);
  UI.SetValue("Script items", "Presets", 0);
  UI.SetValue("Script items", "Randomization Speed", 0);
  AntiAim.SetOverride(0);
}
function unload() {
  reset();
}
Cheat.RegisterCallback("CreateMove", "move");
Cheat.RegisterCallback("Draw", "draw");
Cheat.RegisterCallback("Unload", "unload");
