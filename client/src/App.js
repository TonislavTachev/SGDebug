import Wrapper from './components/Wrapper';
import { ThemeProvider as MuiThemeProvider } from '@mui/styles';
import SgDebugTheme from './setup/sgDebugTheme';
import { Provider } from 'react-redux';
import Store from './setup/store';
import './loading-indicator.css';

function App() {
    return (
        <Provider store={Store}>
            <MuiThemeProvider theme={SgDebugTheme}>
                <Wrapper />
            </MuiThemeProvider>
        </Provider>
    );
}

export default App;
