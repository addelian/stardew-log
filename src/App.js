import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './App.css';
import Main from "./components/Main";

const theme = createMuiTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
          <Main />
      </div>
    </ThemeProvider>
  );
}

export default App;
