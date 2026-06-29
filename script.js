
const OS = {
  z: 20,
  apps: {},
  tasks: {},
  windows: {},
  fs: {},
  logs: [],
  mail: [],
  processes: [],
  drag: {active:false, win:null, dx:0, dy:0},
  currentDir: "/",
  state: {
    notes: `PENSAMENTO 32,

Ela era síntese pura, a resolução do problema inexistente.
Talvez amar fosse apenas outra forma de errar com método.

Carolina sempre parecia maior que o lugar onde estava.
Mesmo quando sumia, permanecia ocupando tudo.`,
    vaultText: "",
    clicker: 0
  },
  networkStats: {rx:0, tx:0, threat:"low"},
  scannerRunning:false
};

const ASCII = {
  sigil: `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠄⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⠎⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡼⠃⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡠⡹⠁⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠔⡵⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⠀⠀⠠⢂⠜⠀⠀⠀⠀⠀⠀⣀⠔⠂
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⢀⡴⢁⠎⠀⠀⠀⠀⣀⠴⠊⠁⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢢⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⣄⠀⠀⠀⠀⠀⠀⠤⣠⠄⠤⠐⡷⠋⣡⣊⣤⣶⠅⡶⠛⠁⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢗⡄⠀⠀⠀⠀⠀⠀⢀⡰⠈⠷⡢⡀⠀⢀⡀⠔⠈⠀⢠⠖⣤⡴⠇⠀⣇⠤⠊⠀⠀⠀⠀⠀⠀⠀⠀
⠁⠢⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⡀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠀⣼⠀⢛⢢⡀⠀⠀⣀⣤⠎⠀⠀⠀⠈⢪⡁⣿⠛⠀⠀⠀⠈⡦⠈⠀⡠⠂⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠈⠳⢤⡀⡀⠀⠀⠀⠀⠀⠀⠀⠳⣄⠀⠀⢸⠀⠀⠀⠀⠀⢠⠇⠀⠸⠂⢰⢄⡙⣹⠁⠀⠀⠀⠀⣀⠜⠁⡰⠊⠈⠑⢆⠀⠀⠔⢀⡤⠤⠤⠤⠀⠒⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠉⠐⠥⡐⠢⢀⡀⠀⠀⠀⢉⠐⡄⠈⢇⠀⠀⠀⢠⢋⣀⡔⠁⠀⠀⠸⠿⠀⠁⠀⠀⠀⠈⠀⣀⠐⠇⡐⡂⢐⠚⠒⠀⠈⠁⠀⠀⢀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠤⣵⠤⠀⠉⡒⡶⠤⣥⠈⠚⠀⠉⠃⠚⠁⣠⢼⡇⠀⠀⠀⠀⠀⠄⠒⠉⠀⢱⢈⡿⠒⠃⠢⡀⢳⢀⣬⣶⣴⠠⠄⠐⠒⠚⠊⠉⠉⠉⠉⠉⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠁⠐⠣⠟⡀⠀⠠⢲⢷⣀⢤⠐⠒⠛⠂⡶⢠⢆⣀⠀⠀⡀⠀⢠⡖⠁⠁⠀⠀⠀⠀⠉⢪⣿⡿⡣⡙⢍⠉⠓⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡔⢁⠄⠒⠒⢢⠑⡠⡝⠂⠤⠮⠤⠬⠙⠚⠀⠀⠈⣩⠉⣉⡗⠚⠛⠛⠉⠁⠀⠀⢱⠗⠲⣌⢎⢢⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⠞⠋⠁⠀⠀⠀⠀⢰⠈⠙⠤⣄⠀⠀⠀⠀⠀⣜⣠⣾⣋⣄⡞⠀⠉⠉⠉⠉⠀⠀⠀⢸⠀⠀⠀⠑⠑⢵⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠊⠀⠀⠀⠀⠀⠀⠀⠀⣸⠀⠀⠀⠈⠁⠀⠀⢀⡼⠋⠸⣸⠿⡉⠙⡄⠀⠀⠀⠀⠀⠀⠀⡼⠀⠀⠀⠀⠀⠀⠙⠦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠠⠞⠀⠀⠀⢻⠀⠘⢆⠣⡀⠀⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⠀⠀⠀⠑⢝⡄⠀⠀⠀⠀⡸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⠀⠀⠙⢦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⡄⠀⠀⠀⠀⠀⠀⠙⠦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
`,
eye: `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⠠⠤⠤⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠄⠂⠁⠁⠀⠀⠀⠀⣀⣀⣀⣀⣀⣀⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁
⠀⠀⠀⠀⠀⠀⢀⠄⠊⠁⣀⡀⠤⠒⢋⣉⣉⣉⣉⣁⡀⠀⠀⠀⠀⠀⠀⠈⠙⠢⢄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⡀⠂⣁⡔⣒⣭⣵⠶⠿⠛⣻⠖⡲⠖⡲⢒⣻⣷⣶⡦⢤⣄⣀⠀⠀⠀⠀⠉⠲⣄⠀⠀⠀⠀⠀⠀⠀
⠀⢀⡤⠪⣊⡵⠞⠋⠉⠄⢀⠊⠁⡟⡥⣞⡁⠘⠛⣩⣔⠛⡻⣿⡶⡄⠁⠉⠶⣄⡀⠀⠀⠈⠳⡄⠀⠀⠀⠀⠀
⠀⣨⡴⠟⠑⠠⠀⠉⠁⠁⠐⠂⣼⢣⡾⡏⡡⠃⠀⠀⠀⠀⢀⡈⣟⣿⡄⠐⡀⠂⠙⢦⡀⠀⠀⠙⡆⠀⠀⠀⠀
⢰⡿⡅⢁⠁⠄⠀⠀⠀⠀⠀⠀⡇⠀⢠⢹⠀⠀⢠⣿⣿⡆⠀⡟⣟⣻⣇⠀⠀⠀⠉⢁⠙⢦⠀⠀⢹⡀⠀⠀⠀
⢻⣇⡇⠠⠈⠁⠀⠀⠀⠀⠀⠀⢱⢸⣼⢸⠀⠀⠈⠛⢛⣁⠜⠀⡿⣿⣿⠀⠀⠀⠀⡐⠈⡐⡳⡀⠀⢧⠀⠀⠀
⠀⠻⣿⣧⡀⠀⠀⠀⠀⠀⠀⠀⠀⣏⣾⡑⣧⡀⠀⠘⠓⠦⠶⢽⣿⡿⡏⠀⠀⠀⠀⠀⠀⠄⢀⡹⡄⠈⡆⠀⠀
⠀⠀⠀⠈⠛⢧⡀⠀⠀⠀⠀⠀⠀⠈⠓⠿⣖⡛⢷⣦⣤⣤⡴⢿⡿⠗⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⠀⠀⠀⠀
⠀⠀⠀⠀⠦⡄⠉⠳⢦⣄⡀⠀⠀⠀⠀⠀⠀⠉⠉⠛⠋⠉⠉⠉⠀⢀⣀⣀⣀⡤⠤⠶⠶⠛⠛⠳⠽⠄⠀⠀⠀
⠀⠀⠀⠀⠀⠈⠳⣄⡀⠈⠙⠛⠲⠦⠤⠤⠤⠤⠤⠤⠶⠒⠒⠋⠉⠉⠉⠁⢀⡤⠖⠒⠒⠒⠒⠂⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠉⠁⠀⠀⠀⠀⣀⣀⣀⣀⣀⡤⠤⠤⠀⠀⠀⠀⠀⠈⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
`,
skyline: `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣾⡿⠋⠀⠀⠀⠀⢀⡀⠀⠀⠀⠀⠀⠀⣀⠀⠀⠀⠀⠈⠹⣿⣦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣤⣶⣶⣶⣶⣾⣿⣿⡁⢀⡇⠀⠀⠀⠀⢣⡀⠀⠀⠀⠀⣰⠃⠀⠀⠀⠀⣇⠀⣹⣿⣿⣶⣶⣶⣶⣤⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣠⡴⠞⠛⠉⠉⠉⠉⠉⠛⠛⠿⢿⣿⣿⣴⡆⠀⠀⢀⣾⠈⢙⣶⣞⠉⢸⣆⠀⠀⠀⣶⣿⣿⣿⡿⠟⠛⠋⠉⠉⠉⠉⠙⠛⠷⣤⡀⠀⠀⠀⠀⠀
⠀⠀⢀⡴⠊⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣿⣷⣶⣴⣿⣇⣴⡿⠁⠹⣷⣄⣿⣷⣴⣶⣿⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠳⣄⠀⠀⠀
⠀⡰⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⢸⢃⣿⡿⠿⣿⣿⣿⠁⠀⠀⢹⣿⣿⡟⠿⣿⣇⢿⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠳⡀⠀
⠘⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣴⡞⠉⠀⢉⣾⡿⠁⠀⣿⠛⢿⣄⠀⢀⣼⠟⢻⡇⠀⠹⣿⣎⠀⠈⠙⣷⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⣶⣶⣿⣿⣿⡀⢀⣠⡿⠃⠀⢀⡼⠃MOSTSERO⠻⣄⠀⠀⠻⣧⣀⠀⣸⣿⣿⣷⣶⣦⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣠⣾⡿⠛⠋⠉⠉⠻⣿⣿⡟⠋⠀⢀⡴⠋⠀⠀⠀03:17⠀⠀⠀⠀⠈⠳⣄⡀⠈⠛⣿⣿⣿⠋⠉⠉⠛⠻⣿⣦⡀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣠⠾⠛⠁⠀⠀⠀⠀⠀⢰⣿⠃⠀⠀⠀⠁⠀⠐⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡆⠀⠀⠁⠀⠀⠀⢻⣿⠀⠀⠀⠀⠀⠀⠘⠻⢦⡀⠀⠀⠀⠀⠀
⠀⠀⠀⢠⡾⠉⠀⠀⠀⠀⠀⠀⠀⣠⣿⠇⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⢿⣧⠀⠀⠀⠀⠀⠀⠀⠀⠹⣦⡀⠀⠀⠀
⠀⠀⣰⠋⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⡏⠀⢀⠀⠀⠀⠀⠀⣰⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢳⡀⠀⠀⠀⠀⢀⠀⠈⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀⠈⢳⡄⠀⠀
⠀⡼⠃⠀⠀⠀⠀⠀⠀⢀⣴⠿⠛⣿⠃⠀⠘⡆⠀⠀⠀⣴⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢷⣄⠀⠀⠀⡞⠀⠀⣿⡟⠻⢷⣄⠀⠀⠀⠀⠀⠀⠀⠻⡄⠀
⣰⠁⠀⠀⠀⠀⠀⠀⢠⠟⠁⠀⠀⣿⠀⠀⢀⣿⢀⣠⡿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⣷⣄⢸⣇⠀⠀⢸⡇⠀⠀⠙⢧⠀⠀⠀⠀⠀⠀⠀⢹⡀
⠇⠀⠀⠀⠀⠀⠀⢠⠇⠀⠀⠀⠀⣿⣷⣦⣾⣿⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⣿⣿⣤⣴⣿⡇⠀⠀⠀⠀⢧⠀⠀⠀⠀⠀⠀⠀⣇
⠀⠀⠀⠀⠀⠀⠀⡜⠀⠀⠀⠀⣠⣿⡿⠻⣿⠿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⢿⡿⠻⣿⣷⡀⠀⠀⠀⠘⡄⠀⠀⠀⠀⠀⠀⠈
⠀⠀⠀⠀⠀⠀⠀⠗⠀⠀⠀⢠⣿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢻⣧⠀⠀⠀⠠⠇⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡜⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
`
};

function nowTime(){
  return new Date().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",second:"2-digit"});
}
function nowShort(){
  return new Date().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"});
}
function updateClock(){
  document.getElementById("clock").textContent = nowShort();
}
setInterval(updateClock,1000);
updateClock();

function glitchBody(){
  document.body.classList.add("glitch");
  setTimeout(() => document.body.classList.remove("glitch"), 130);
}
function toast(text){
  const t = document.getElementById("toast");
  t.textContent = text;
  t.classList.add("show");
  glitchBody();
  setTimeout(() => t.classList.remove("show"), 3500);
}
function log(msg){
  const line = "[" + nowTime() + "] " + msg;
  OS.logs.unshift(line);
  OS.logs = OS.logs.slice(0,300);
  refreshLogs();
}

function seedFS(){
  OS.fs = {
    "/": {type:"dir", children:["home","evidence","archive","chat","mail","sys","ascii","vault"]},
    "/home": {type:"dir", children:["julieta_notes.txt","draft_02.txt"]},
    "/home/julieta_notes.txt": {type:"file", content:OS.state.notes},
    "/home/draft_02.txt": {type:"file", content:`Acho que vão entender tudo errado.
O que me sufoca é a ausência de informações e ter informações demais.`},

    "/evidence": {type:"dir", children:["photo_amanhecer.txt","lab_result.txt","blood_note.txt","coach_photo.txt"]},
    "/evidence/photo_amanhecer.txt": {type:"file", content:`[foto]
Carolina saindo da Amanhecer com o treinador Marcelo Mitiva.
Horário aproximado: 05:58
Origem: Kaiser`},
    "/evidence/lab_result.txt": {type:"file", content:`Laboratório de análises clínicas
Resultado: excluído o vínculo de paternidade entre Geizon Stozzo e Carolina Stozzo.
Observação: compatibilidade parcial encontrada com outra amostra masculina não identificada.`},
    "/evidence/blood_note.txt": {type:"file", content:`O sangue encontrado no armário de Julieta corresponde a Carolina.
Julieta alegou que a amostra foi obtida com consentimento para um exame.`},
    "/evidence/coach_photo.txt": {type:"file", content:`[memória]
Marcelo Mitiva aparentava saber mais do que disse.
Reagiu ao sangue como quem já esperava a descoberta.`},

    "/archive": {type:"dir", children:["interrogatorio_julieta.txt","interrogatorio_diana.txt","case_summary.txt"]},
    "/archive/interrogatorio_julieta.txt": {type:"file", content:`Delegado Macedo:
"Temos algumas perguntas sobre o desaparecimento de Carolina Stozzo."

Julieta:
"Eu queria saber dela, mas sempre fui péssima em achá-la."

Nota:
Julieta demonstrou forte reação ao ser informada do sangue encontrado em seu armário.`},
    "/archive/interrogatorio_diana.txt": {type:"file", content:`Diana Mariz:
"Ela parecia abraçar o mundo na maior parte do tempo.
A retribuição foi meio injusta."

Diana também afirmou que Carolina citou conflitos familiares e uma possível traição.`},
    "/archive/case_summary.txt": {type:"file", content:`Caso: desaparecimento de Carolina Stozzo
Local: boate Amanhecer
Último horário confirmado: madrugada, entre 04:35 e 06:16
Pessoas de interesse:
- Julieta Argy
- Diana Mariz
- Kaiser Santos
- Elizabeth "Betty"
- Bruno
- Marcelo Mitiva
- Geizon Stozzo`},

    "/chat": {type:"dir", children:["group_thread.txt","betty_diana.txt","julieta_carolina.txt"]},
    "/chat/group_thread.txt": {type:"file", content:`[grupo: toupeiras]
Kaiser: consegui a lista de quem tava lá
Betty: não é possível que realmente achem que foi você
Diana: alguém está escondendo alguma coisa
Julieta: eu vejo vocês depois`},
    "/chat/betty_diana.txt": {type:"file", content:`Betty: você não me responde desde a aula
Betty: onde você tava?
Diana: tomei remédio
Diana: acho que o senhor Stozzo sabe mais do que conta`},
    "/chat/julieta_carolina.txt": {type:"file", content:`Carolina: você exagera quando é confrontada
Julieta: nossa amizade era ótima até tomarmos atitudes impossíveis de desfazer`},

    "/mail": {type:"dir", children:["inbox_01.msg","inbox_02.msg","inbox_03.msg"]},
    "/mail/inbox_01.msg": {type:"file", content:`de: kaiser@mesh
assunto: foto

Julie,
te mandei a imagem. ela saiu com ele.
não apaga isso.`},
    "/mail/inbox_02.msg": {type:"file", content:`de: clinic@lab
assunto: laboratório de análises clínicas

resultado disponível para consulta.`},
    "/mail/inbox_03.msg": {type:"file", content:`de: unknown@relay
assunto: você está olhando para o lugar errado

o desaparecimento começou antes da boate.`},

    "/sys": {type:"dir", children:["process.table","network.state","build.info"]},
    "/sys/process.table": {type:"file", content:`messenger.core
archive.reader
wm.core
watcher.net
mail.daemon`},
    "/sys/network.state": {type:"file", content:`threat=medium
rx=0
tx=0`},
    "/sys/build.info": {type:"file", content:`NECRO//OS Mostsero Build
case mode enabled`},

    "/ascii": {type:"dir", children:["sigil.asc","eye.asc","skyline.asc"]},
    "/ascii/sigil.asc": {type:"file", content:ASCII.sigil},
    "/ascii/eye.asc": {type:"file", content:ASCII.eye},
    "/ascii/skyline.asc": {type:"file", content:ASCII.skyline},

    "/vault": {type:"dir", children:["hidden_01.enc","fragments.enc"]},
    "/vault/hidden_01.enc": {type:"file", content:"Q2Fyb2xpbmEgbmFvIHN1bWl1IHBvciBhY2Fzby4="},
    "/vault/fragments.enc": {type:"file", content:"SmFjb2JpcyBkbyBjYXNvIG5hbyBiYXRlbSBjb20gYSBwb2xpY2lhLg=="}
  };
}

function seedMail(){
  OS.mail = [
    {
      id:id(),
      from:"kaiser@mesh",
      subject:"a foto",
      time:nowTime(),
      body:"Eu mandei a imagem. Carolina saiu da Amanhecer com o treinador. Isso muda tudo."
    },
    {
      id:id(),
      from:"clinic@lab",
      subject:"resultado disponível",
      time:nowTime(),
      body:"O resultado do exame foi liberado no sistema. Acesso solicitado fora do horário padrão."
    },
    {
      id:id(),
      from:"unknown@relay",
      subject:"você está olhando para o lugar errado",
      time:nowTime(),
      body:"Se quiser entender o que aconteceu com Carolina, comece pelos conflitos da família. A boate não foi o início."
    }
  ];
}

function seedProcesses(){
  OS.processes = [
    {name:"wm.core", cpu:2, mem:82, pid:114},
    {name:"messenger.core", cpu:1, mem:41, pid:221},
    {name:"archive.reader", cpu:4, mem:58, pid:307},
    {name:"watcher.net", cpu:6, mem:73, pid:411},
    {name:"mail.user", cpu:1, mem:30, pid:512}
  ];
}

function id(){
  return Math.random().toString(36).slice(2,10);
}

function getNode(path){ return OS.fs[path] || null; }

function normalizePath(path){
  if(!path) return OS.currentDir;
  if(path === ".") return OS.currentDir;
  if(path === "/") return "/";
  let full = path.startsWith("/") ? path : (OS.currentDir === "/" ? "/" + path : OS.currentDir + "/" + path);
  const parts = [];
  full.split("/").forEach(p => {
    if(!p || p === ".") return;
    if(p === "..") parts.pop();
    else parts.push(p);
  });
  return "/" + parts.join("/");
}

function listDir(path){
  const node = getNode(normalizePath(path));
  if(!node || node.type !== "dir") return null;
  return node.children.slice();
}
function readFile(path){
  const node = getNode(normalizePath(path));
  if(!node || node.type !== "file") return null;
  return node.content;
}
function writeFile(path, content){
  const p = normalizePath(path);
  const parts = p.split("/").filter(Boolean);
  const name = parts.pop();
  const parent = "/" + parts.join("/");
  const parentNode = getNode(parent || "/");
  if(!parentNode || parentNode.type !== "dir") return false;
  if(!OS.fs[p]){
    OS.fs[p] = {type:"file", content};
    parentNode.children.push(name);
  }else{
    OS.fs[p].content = content;
  }
  return true;
}

function registerApp(app){
  OS.apps[app.id] = app;
}

let iconIndex = 0;

const iconPositions = JSON.parse(localStorage.getItem("iconPositions") || "{}");

function createIcon(app){
  const d = document.createElement("div");

  d.className = "icon";
  d.innerHTML = `
    <div class="i">${app.icon}</div>
    <div class="t">${app.title}</div>
  `;

  d.onclick = () => openApp(app.id);

  d.style.position = "absolute";

  
 d.dataset.app = app.id;

if(iconPositions[app.id]){
    d.style.left = iconPositions[app.id].left;
    d.style.top = iconPositions[app.id].top;
}else{
    d.style.left = "20px";
    d.style.top = (20 + iconIndex * 90) + "px";
    iconIndex++;
}
  
  document.querySelector("#desktop").appendChild(d);

  return d;
  
  makeDraggableIcon(d, app);

  document.getElementById("desktop").appendChild(d);
}

function createStartItem(app){
  const d = document.createElement("div");
  d.className = "menu-item";
  d.innerHTML = `<div>${app.icon}</div><div>${app.title}</div>`;
  d.onclick = () => {
    openApp(app.id);
    toggleStart(false);
  };
  document.getElementById("startMenuList").appendChild(d);
}

function createWindow(app){
  const w = document.createElement("div");
  w.className = "window";
  w.id = "win-" + app.id;
  w.style.left = (100 + Math.floor(Math.random()*140)) + "px";
  w.style.top = (70 + Math.floor(Math.random()*80)) + "px";
  w.innerHTML = `
    <div class="titlebar">
      <div class="title-left">
        <div class="title-icon">${app.icon}</div>
        <div class="title-text">${app.title}</div>
      </div>
      <div class="title-right">
        <button class="win-btn min">_</button>
        <button class="win-btn max">□</button>
        <button class="win-btn close">x</button>
      </div>
    </div>
    <div class="content"></div>
  `;
  document.body.appendChild(w);
  OS.windows[app.id] = w;
  const content = w.querySelector(".content");
  content.innerHTML = app.render ? app.render() : "";
  bindWindowControls(app.id,w);
  dragWindow(w);
  if(app.onMount) app.onMount(w);
}

function bindWindowControls(id,w){
  w.querySelector(".min").onclick = e => {
    e.stopPropagation();
    minimizeApp(id);
  };
  w.querySelector(".close").onclick = e => {
    e.stopPropagation();
    closeApp(id);
  };
  w.querySelector(".max").onclick = e => {
    e.stopPropagation();
    toggleMaximize(w);
  };
  w.addEventListener("mousedown",() => focusWindow(w));
}

function toggleMaximize(w){
  if(w.dataset.max === "1"){
    w.dataset.max = "0";
    w.style.left = w.dataset.prevLeft;
    w.style.top = w.dataset.prevTop;
    w.style.width = w.dataset.prevWidth;
    w.style.height = w.dataset.prevHeight;
  }else{
    w.dataset.prevLeft = w.style.left;
    w.dataset.prevTop = w.style.top;
    w.dataset.prevWidth = w.style.width || (w.offsetWidth + "px");
    w.dataset.prevHeight = w.style.height || (w.offsetHeight + "px");
    w.dataset.max = "1";
    w.style.left = "10px";
    w.style.top = "10px";
    w.style.width = (window.innerWidth - 20) + "px";
    w.style.height = (window.innerHeight - 66) + "px";
  }
  focusWindow(w);
}

function dragWindow(w){
  const bar = w.querySelector(".titlebar");
  bar.addEventListener("mousedown", e => {
    if(e.target.closest(".win-btn")) return;
    if(w.dataset.max === "1") return;
    OS.drag.active = true;
    OS.drag.win = w;
    OS.drag.dx = e.clientX - w.offsetLeft;
    OS.drag.dy = e.clientY - w.offsetTop;
    focusWindow(w);
  });
}
document.addEventListener("mousemove", e => {
  if(!OS.drag.active || !OS.drag.win) return;
  OS.drag.win.style.left = (e.clientX - OS.drag.dx) + "px";
  OS.drag.win.style.top = (e.clientY - OS.drag.dy) + "px";
});
document.addEventListener("mouseup", () => {
  OS.drag.active = false;
  OS.drag.win = null;
});

function focusWindow(w){
  OS.z++;
  document.querySelectorAll(".window").forEach(x => x.classList.remove("active"));
  w.classList.add("active");
  w.style.zIndex = OS.z;
}

function addTask(app){
  if(OS.tasks[app.id]) return;
  const t = document.createElement("div");
  t.className = "task";
  t.id = "task-" + app.id;
  t.innerHTML = `<div>${app.icon}</div><div class="tt">${app.title}</div>`;
  t.onclick = () => {
    const win = OS.windows[app.id];
    if(win.style.display === "none") openApp(app.id);
    else minimizeApp(app.id);
  };
  document.getElementById("tasks").appendChild(t);
  OS.tasks[app.id] = t;
}
function syncTaskState(id){
  Object.values(OS.tasks).forEach(t => t.classList.remove("active"));
  const w = OS.windows[id];
  if(w && w.style.display !== "none" && OS.tasks[id]) OS.tasks[id].classList.add("active");
}
function openApp(id){
  const app = OS.apps[id];
  const w = OS.windows[id];
  if(!app || !w) return;
  w.style.display = "flex";
  addTask(app);
  focusWindow(w);
  syncTaskState(id);
  if(app.onOpen) app.onOpen(w);
  glitchBody();
}
function minimizeApp(id){
  const w = OS.windows[id];
  if(!w) return;
  w.style.display = "none";
  if(OS.tasks[id]) OS.tasks[id].classList.remove("active");
}
function closeApp(id){
  minimizeApp(id);
}

function toggleStart(force){
  const menu = document.getElementById("startMenu");
  const next = typeof force === "boolean" ? force : menu.style.display !== "block";
  menu.style.display = next ? "block" : "none";
}
document.getElementById("startBtn").onclick = e => {
  e.stopPropagation();
  toggleStart();
};
document.addEventListener("click", e => {
  if(!e.target.closest("#startMenu") && !e.target.closest("#startBtn")) toggleStart(false);
});

function refreshLogs(){
  const box = document.getElementById("log-output");
  if(box) box.textContent = OS.logs.join("\n");
}

function refreshFilesUI(){
  const list = document.getElementById("fileBrowserList");
  if(!list) return;
  list.innerHTML = "";
  const items = listDir(OS.currentDir) || [];
  if(OS.currentDir !== "/"){
    const up = document.createElement("div");
    up.className = "file-item";
    up.textContent = "[..]";
    up.onclick = () => {
      OS.currentDir = normalizePath("..");
      refreshFilesUI();
    };
    list.appendChild(up);
  }
  items.forEach(name => {
    const p = OS.currentDir === "/" ? "/" + name : OS.currentDir + "/" + name;
    const node = getNode(p);
    const el = document.createElement("div");
    el.className = "file-item";
    el.textContent = (node.type === "dir" ? "DIR  " : "FILE ") + name;
    el.onclick = () => {
      if(node.type === "dir"){
        OS.currentDir = p;
        refreshFilesUI();
      }else{
        document.getElementById("fileViewer").value = node.content;
        document.getElementById("fileViewer").dataset.path = p;
        document.getElementById("filePath").textContent = p;
      }
    };
    list.appendChild(el);
  });
  document.getElementById("fileCurrentPath").textContent = OS.currentDir;
}

function refreshProcessUI(){
  const box = document.getElementById("procList");
  if(!box) return;
  box.innerHTML = "";
  OS.processes.forEach(p => {
    const el = document.createElement("div");
    el.className = "process-item";
    el.innerHTML = `<span>${p.pid} :: ${p.name}</span><span>CPU ${p.cpu}% | MEM ${p.mem}MB</span>`;
    box.appendChild(el);
  });
}

function updateMonitorUI(){
  const cpu = 8 + Math.floor(Math.random()*20);
  const mem = 32 + Math.floor(Math.random()*28);
  OS.networkStats.rx += Math.floor(Math.random()*3);
  OS.networkStats.tx += Math.floor(Math.random()*3);

  const bars = {
    monCpuBar: cpu,
    monMemBar: mem,
    monRxBar: Math.min(100, OS.networkStats.rx % 101),
    monTxBar: Math.min(100, OS.networkStats.tx % 101)
  };
  Object.entries(bars).forEach(([id,val]) => {
    const el = document.getElementById(id);
    if(el) el.style.width = val + "%";
  });

  const s = document.getElementById("monitorStats");
  if(s){
    s.innerHTML = `
      <tr><td>cpu load</td><td>${cpu}%</td></tr>
      <tr><td>memory pressure</td><td>${mem}%</td></tr>
      <tr><td>rx packets</td><td>${OS.networkStats.rx}</td></tr>
      <tr><td>tx packets</td><td>${OS.networkStats.tx}</td></tr>
      <tr><td>case threat</td><td>${OS.networkStats.threat}</td></tr>
    `;
  }

  const netMini = document.getElementById("netMini");
  netMini.textContent = "CASE: " + OS.networkStats.threat + " | RX " + OS.networkStats.rx + " | TX " + OS.networkStats.tx;
}
setInterval(updateMonitorUI,2000);

function renderMail(){
  const list = document.getElementById("mailList");
  const body = document.getElementById("mailBody");
  if(!list || !body) return;
  list.innerHTML = "";
  OS.mail.forEach(m => {
    const el = document.createElement("div");
    el.className = "mail-item";
    el.innerHTML = `<div><strong>${m.subject}</strong></div><div class="small">${m.from} :: ${m.time}</div>`;
    el.onclick = () => {
      body.value = "de: " + m.from + "\nassunto: " + m.subject + "\nhora: " + m.time + "\n\n" + m.body;
    };
    list.appendChild(el);
  });
  if(OS.mail[0]){
    body.value = "de: " + OS.mail[0].from + "\nassunto: " + OS.mail[0].subject + "\nhora: " + OS.mail[0].time + "\n\n" + OS.mail[0].body;
  }
}

function renderMessenger(){
  const threads = [
    {
      title:"grupo :: toupeiras",
      body:`Kaiser: consegui a lista de quem tava lá.
Betty: não é possível que realmente achem que foi você.
Diana: alguém está escondendo alguma coisa.
Julieta: eu vejo vocês depois.
Diana: o senhor Stozzo sabe mais do que conta.`
    },
    {
      title:"Betty <-> Diana",
      body:`Betty: você não me responde desde a aula.
Diana: tomei remédio.
Betty: isso não é resposta.
Diana: eu acho que o pai dela sabe mais do que expõe.`
    },
    {
      title:"Julieta <-> Carolina",
      body:`Carolina: você exagera quando é confrontada.
Julieta: nossa amizade era ótima até tomarmos atitudes impossíveis de desfazer.
Carolina: eu nunca disse que largaria ele.`
    }
  ];

  const list = document.getElementById("chatList");
  const view = document.getElementById("chatView");
  if(!list || !view) return;
  list.innerHTML = "";
  threads.forEach(t => {
    const el = document.createElement("div");
    el.className = "chat-item";
    el.innerHTML = `<div><strong>${t.title}</strong></div><div class="small">fragmento recuperado</div>`;
    el.onclick = () => view.textContent = t.body;
    list.appendChild(el);
  });
  view.textContent = threads[0].body;
}

function renderBoard(){
  const el = document.getElementById("caseBoard");
  if(!el) return;
  el.innerHTML = `
    <div class="card">
      <h4>Carolina Stozzo</h4>
      <p>desaparecida após a boate Amanhecer</p>
      <p>último círculo: Julieta, Diana, Kaiser, Betty, Bruno, Marcelo</p>
    </div>
    <div class="card">
      <h4>Julieta Argy</h4>
      <p>sangue da vítima encontrado no armário</p>
      <p>alega exame consentido e roubo de amostra</p>
    </div>
    <div class="card">
      <h4>Geizon Stozzo</h4>
      <p>pai oficial, delegado, conflitos familiares</p>
      <p>motivo possível: ciúme, paternidade, controle</p>
    </div>
    <div class="card">
      <h4>Marcelo Mitiva</h4>
      <p>treinador</p>
      <p>suspeita: possível pai biológico</p>
    </div>
    <div class="card">
      <h4>Diana Mariz</h4>
      <p>depoimento incompleto</p>
      <p>sabe mais do que contou no interrogatório</p>
    </div>
    <div class="card">
      <h4>Bruno</h4>
      <p>namorado</p>
      <p>ciúme, brigas, saiu da boate, ligação com Stozzo incerta</p>
    </div>
  `;
}

function scannerRun(){
  if(OS.scannerRunning) return;
  const target = document.getElementById("scanTarget").value.trim() || "amanhecer.local";
  const out = document.getElementById("scanOut");
  OS.scannerRunning = true;
  out.textContent = "";
  const steps = [
    "coletando registros do alvo " + target,
    "sincronizando horários...",
    "comparando rotas de saída...",
    "buscando lacunas entre 04:35 e 06:16..."
  ];
  let i = 0;
  const findings = [
    "câmera traseira offline por 07 min",
    "saída lateral aberta fora do padrão",
    "veículo sem placa parcial detectado",
    "convergência entre treinador e vítima confirmada"
  ];

  const timer = setInterval(() => {
    if(i < steps.length){
      out.textContent += steps[i] + "\n";
      i++;
      out.scrollTop = out.scrollHeight;
      return;
    }
    if(findings.length){
      out.textContent += findings.shift() + "\n";
      out.scrollTop = out.scrollHeight;
      OS.networkStats.rx += 4;
      OS.networkStats.tx += 2;
      return;
    }
    clearInterval(timer);
    out.textContent += "\nresultado: cenário contraditório, múltiplas omissões detectadas.\n";
    OS.scannerRunning = false;
    OS.networkStats.threat = "high";
    log("scanner narrativo concluído para " + target);
    toast("novas inconsistências detectadas");
  }, 420);
}

function runTerminalCommand(raw){
  const input = raw.trim();
  if(!input) return "";
  const parts = input.split(" ");
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  if(cmd === "help"){
    return [
      "comandos:",
      "help",
      "clear",
      "ls [path]",
      "cd <path>",
      "pwd",
      "cat <file>",
      "write <file> <texto>",
      "scan <alvo>",
      "open <app>",
      "ps",
      "mail",
      "date"
    ].join("\n");
  }
  if(cmd === "clear") return "__CLEAR__";
  if(cmd === "ls"){
    const p = normalizePath(args[0] || OS.currentDir);
    const l = listDir(p);
    if(!l) return "diretório inexistente";
    return l.map(name => {
      const full = p === "/" ? "/" + name : p + "/" + name;
      return (getNode(full).type === "dir" ? "[DIR] " : "[FILE] ") + name;
    }).join("\n");
  }
  if(cmd === "cd"){
    const p = normalizePath(args[0] || "/");
    const n = getNode(p);
    if(!n || n.type !== "dir") return "diretório inválido";
    OS.currentDir = p;
    refreshFilesUI();
    return "cwd => " + OS.currentDir;
  }
  if(cmd === "pwd") return OS.currentDir;
  if(cmd === "cat"){
    const c = readFile(args[0]);
    return c === null ? "arquivo não encontrado" : c;
  }
  if(cmd === "write"){
    if(args.length < 2) return "uso: write <arquivo> <texto>";
    const ok = writeFile(args[0], args.slice(1).join(" "));
    refreshFilesUI();
    return ok ? "arquivo salvo" : "falha ao salvar";
  }
  if(cmd === "scan"){
    const target = args[0] || "amanhecer.local";
    openApp("scanner");
    setTimeout(() => {
      document.getElementById("scanTarget").value = target;
      scannerRun();
    },80);
    return "scanner aberto para " + target;
  }
  if(cmd === "open"){
    const app = args[0];
    if(!OS.apps[app]) return "app inexistente";
    openApp(app);
    return "abrindo " + app;
  }
  if(cmd === "ps"){
    return OS.processes.map(p => `${p.pid}\t${p.name}\tCPU:${p.cpu}%\tMEM:${p.mem}MB`).join("\n");
  }
  if(cmd === "mail"){
    return OS.mail.map(m => `${m.time} | ${m.from} | ${m.subject}`).join("\n");
  }
  if(cmd === "date"){
    return new Date().toString();
  }
  return "comando desconhecido: " + cmd;
}

function boot(){
  document.getElementById("boot").style.display = "none";
  initOS();
  toast("casebuild carregado");
}
document.getElementById("boot").onclick = boot;

function initOS(){
  seedFS();
  seedMail();
  seedProcesses();

  registerApp({
    id:"terminal",
    title:"terminal",
    icon:"⌘",
    render:() => `
      <div class="terminal">
        <div id="termOut" class="term-out">NECRO//OS case shell\nDigite "help".\n\n</div>
        <div class="term-line">
          <div class="term-prompt">root@mostsero:${OS.currentDir}$</div>
          <input id="termInput" class="term-input" autocomplete="off" />
        </div>
      </div>
    `,
    onMount:(w) => {
      const input = w.querySelector("#termInput");
      const out = w.querySelector("#termOut");
      input.addEventListener("keydown", e => {
        if(e.key === "Enter"){
          const value = input.value;
          out.textContent += "root@mostsero:" + OS.currentDir + "$ " + value + "\n";
          const result = runTerminalCommand(value);
          if(result === "__CLEAR__") out.textContent = "";
          else out.textContent += result + "\n\n";
          input.value = "";
          out.scrollTop = out.scrollHeight;
          w.querySelector(".term-prompt").textContent = "root@mostsero:" + OS.currentDir + "$";
        }
      });
    },
    onOpen:(w) => {
      const i = w.querySelector("#termInput");
      if(i) setTimeout(() => i.focus(),50);
    }
  });

  registerApp({
    id:"files",
    title:"file matrix",
    icon:"🖼",
    render:() => `
      <div class="grid-2">
        <div class="panel">
          <div><strong>diretório</strong> <span class="badge" id="fileCurrentPath">/</span></div>
          <div id="fileBrowserList" class="file-list" style="margin-top:8px"></div>
        </div>
        <div class="panel">
          <div><strong>visualizador</strong> <span id="filePath" class="small">nenhum arquivo</span></div>
          <textarea id="fileViewer" style="height:300px;margin-top:8px"></textarea>
          <div class="row">
            <button id="saveFileBtn">salvar</button>
            <button id="newFileBtn">novo em /home</button>
          </div>
        </div>
      </div>
    `,
    onMount:(w) => {
      refreshFilesUI();
      w.querySelector("#saveFileBtn").onclick = () => {
        const viewer = w.querySelector("#fileViewer");
        const path = viewer.dataset.path;
        if(!path){
          toast("nenhum arquivo selecionado");
          return;
        }
        writeFile(path, viewer.value);
        if(path === "/home/julieta_notes.txt") OS.state.notes = viewer.value;
        toast("arquivo salvo");
        log("arquivo modificado " + path);
      };
      w.querySelector("#newFileBtn").onclick = () => {
        const name = prompt("nome do arquivo");
        if(!name) return;
        writeFile("/home/" + name, "");
        refreshFilesUI();
        toast("arquivo criado");
      };
    },
    onOpen:() => refreshFilesUI()
  });

  registerApp({
    id:"messenger",
    title:"messenger",
    icon:"⌨",
    render:() => `
      <div class="grid-2">
        <div class="panel">
          <div><strong>threads</strong></div>
          <div id="chatList" class="chat-list" style="margin-top:8px"></div>
        </div>
        <div class="panel">
          <div><strong>conteúdo</strong></div>
          <div id="chatView" class="msg-view" style="margin-top:8px"></div>
        </div>
      </div>
    `,
    onOpen:() => renderMessenger()
  });

  registerApp({
    id:"caseboard",
    title:"caseboard",
    icon:"⁴⁰⁴",
    render:() => `
      <div>
        <div class="panel">
          <div><strong>mural do caso</strong></div>
          <div id="caseBoard" class="board" style="margin-top:8px"></div>
        </div>
      </div>
    `,
    onOpen:() => renderBoard()
  });

  registerApp({
    id:"archive",
    title:"police archive",
    icon:"⚠︎",
    render:() => `
      <div class="panel">
        <div><strong>arquivo de interrogatórios</strong></div>
        <div class="small">acesse também via /archive no file matrix</div>
        <div id="log-output" class="log" style="min-height:320px;margin-top:8px"></div>
      </div>
    `,
    onOpen:() => refreshLogs()
  });

  registerApp({
    id:"notes",
    title:"julieta notes",
    icon:"ᝰ.ᐟ",
    render:() => `
      <div class="panel">
        <div><strong>rascunho</strong></div>
        <textarea id="notesArea" style="height:320px;margin-top:8px">${OS.state.notes}</textarea>
        <div class="row">
          <button id="saveNotesBtn">salvar em /home/julieta_notes.txt</button>
          <button id="loadNotesBtn">recarregar</button>
        </div>
      </div>
    `,
    onMount:(w) => {
      w.querySelector("#saveNotesBtn").onclick = () => {
        const val = w.querySelector("#notesArea").value;
        OS.state.notes = val;
        writeFile("/home/julieta_notes.txt", val);
        toast("diário sincronizado");
        log("notes atualizadas");
      };
      w.querySelector("#loadNotesBtn").onclick = () => {
        const val = readFile("/home/julieta_notes.txt") || "";
        w.querySelector("#notesArea").value = val;
      };
    }
  });

  registerApp({
    id:"vault",
    title:"black vault",
    icon:"꩜",
    render:() => `
      <div class="grid-2">
        <div class="panel">
          <div><strong>payload</strong></div>
          <textarea id="vaultInput" style="height:250px"></textarea>
          <div class="row">
            <button id="encBtn">codificar</button>
            <button id="decBtn">decodificar</button>
          </div>
        </div>
        <div class="panel">
          <div><strong>resultado</strong></div>
          <textarea id="vaultOutput" style="height:300px"></textarea>
        </div>
      </div>
    `,
    onMount:(w) => {
      const enc = s => btoa(unescape(encodeURIComponent(s)));
      const dec = s => {
        try{ return decodeURIComponent(escape(atob(s))); }
        catch(e){ return "falha ao decodificar"; }
      };
      w.querySelector("#encBtn").onclick = () => {
        w.querySelector("#vaultOutput").value = enc(w.querySelector("#vaultInput").value);
      };
      w.querySelector("#decBtn").onclick = () => {
        w.querySelector("#vaultOutput").value = dec(w.querySelector("#vaultInput").value);
      };
    }
  });

  registerApp({
    id:"mail",
    title:"mail user",
    icon:"✉︎",
    render:() => `
      <div class="grid-2">
        <div class="panel">
          <div><strong>caixa de entrada</strong></div>
          <div id="mailList" style="margin-top:8px;max-height:320px;overflow:auto"></div>
        </div>
        <div class="panel">
          <div><strong>mensagem</strong></div>
          <textarea id="mailBody" style="height:340px;margin-top:8px"></textarea>
        </div>
      </div>
    `,
    onOpen:() => renderMail()
  });

  registerApp({
    id:"scanner",
    title:"route scanner",
    icon:"☣",
    render:() => `
      <div class="col">
        <div class="panel">
          <div class="row">
            <input id="scanTarget" placeholder="alvo ex: amanhecer.local" />
            <button id="scanBtn" style="max-width:190px">reconstruir rota</button>
          </div>
        </div>
        <div class="panel">
          <div><strong>resultado</strong></div>
          <div id="scanOut" class="log" style="min-height:280px;margin-top:8px"></div>
        </div>
      </div>
    `,
    onMount:(w) => {
      w.querySelector("#scanBtn").onclick = scannerRun;
    }
  });

  registerApp({
    id:"monitor",
    title:"system monitor",
    icon:"⏻",
    render:() => `
      <div class="grid-2">
        <div class="panel">
          <div><strong>métricas</strong></div>
          <div class="small">cpu</div>
          <div class="progress"><div id="monCpuBar"></div></div>
          <div class="small" style="margin-top:8px">memória</div>
          <div class="progress"><div id="monMemBar"></div></div>
          <div class="small" style="margin-top:8px">rx</div>
          <div class="progress"><div id="monRxBar"></div></div>
          <div class="small" style="margin-top:8px">tx</div>
          <div class="progress"><div id="monTxBar"></div></div>
        </div>
        <div class="panel">
          <div><strong>estado</strong></div>
          <table class="kv"><tbody id="monitorStats"></tbody></table>
        </div>
      </div>
    `,
    onOpen:() => updateMonitorUI()
  });

  registerApp({
    id:"processes",
    title:"process daemon",
    icon:"⚙",
    render:() => `
      <div class="panel">
        <div><strong>processos</strong></div>
        <div id="procList" style="margin-top:8px"></div>
      </div>
    `,
    onOpen:() => refreshProcessUI()
  });

  registerApp({
    id:"ascii",
    title:"ascii reliquary",
    icon:"☠",
    render:() => `
      <div class="col">
        <div class="panel">
          <div class="row">
            <select id="asciiSelect">
              <option value="sigil">sigil</option>
              <option value="eye">eye</option>
              <option value="skyline">skyline</option>
            </select>
            <button id="asciiLoadBtn" style="max-width:180px">carregar</button>
          </div>
        </div>
        <div id="asciiBox" class="ascii-box">${ASCII.sigil}</div>
      </div>
    `,
    onMount:(w) => {
      w.querySelector("#asciiLoadBtn").onclick = () => {
        const sel = w.querySelector("#asciiSelect").value;
        w.querySelector("#asciiBox").textContent = ASCII[sel];
      };
    }
  });

  Object.values(OS.apps).forEach(app => {
    createWindow(app);
    createIcon(app);
    createStartItem(app);
  });

  log("caso Carolina Stozzo carregado");
  log("mensagens restauradas");
  log("arquivos de evidência montados em /evidence");
  log("interrogatórios parcialmente recuperados");
  log("observador silencioso detectado na malha");
  log("Julieta manteve informações fora do depoimento");
  log("Diana omitiu parte da conversa da boate");

  setInterval(() => {
    const pool = [
      "novo conflito detectado entre linha oficial e depoimentos",
      "lacuna horária ampliada entre 05:58 e 06:16",
      "artefato de imagem associado ao treinador",
      "mensagem anônima sugere motivação anterior à boate",
      "inconsistência entre Bruno e Geizon permanece sem explicação"
    ];
    log(pool[Math.floor(Math.random()*pool.length)]);
  }, 22000);

  openApp("messenger");
  openApp("caseboard");
  openApp("terminal");
}

function makeDraggableIcon(icon){

    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;

    icon.addEventListener("mousedown", function(e){
        dragging = true;
        offsetX = e.clientX - icon.offsetLeft;
        offsetY = e.clientY - icon.offsetTop;
    });

    document.addEventListener("mousemove", function(e){
        if(!dragging) return;

        icon.style.left = (e.clientX - offsetX) + "px";
        icon.style.top = (e.clientY - offsetY) + "px";
    });

    document.addEventListener("mouseup", function(){
        dragging = false;
    });

}

