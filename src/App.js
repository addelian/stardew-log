import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';
import './App.css';
import Main from "./components/Main";

const theme = createTheme();

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className="App">
            <Main />
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
