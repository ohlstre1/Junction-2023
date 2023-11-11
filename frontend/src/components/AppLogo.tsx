import logo from '@/assets/logo.svg'
// import darkBen from '@/assets/ben_dark.svg'
// import { observer } from 'mobx-react-lite'
// import themeStore from '@/store/themeStore'

const AppLogo = () => {
    return (
        <>
            {/* {themeStore.theme === 'light' ? <img className="ben" src={lightBen} alt="Logo" /> : <img className="ben" src={darkBen} alt="Logo" />} */}
            <img className="ben" src={logo} alt="Logo" />
        </>
    )
}

export default AppLogo