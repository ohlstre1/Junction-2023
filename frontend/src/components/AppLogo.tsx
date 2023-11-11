import lightLogo from '@/assets/light.svg';
import darkLogo from '@/assets/dark.svg';
// import darkBen from '@/assets/ben_dark.svg'
import { observer } from 'mobx-react-lite'
import themeStore from '@/store/ThemeStore'

const AppLogo = observer(() => {
    return (
        <>
            {themeStore.theme === 'light' ? <img src={lightLogo} alt="Logo" /> : <img src={darkLogo} alt="Logo" />}
        </>
    )
});

export default AppLogo