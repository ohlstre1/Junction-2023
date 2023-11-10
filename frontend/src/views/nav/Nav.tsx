import { ModeToggle } from '@/components/theme-toggle';
import './Nav.scss';

const Nav = () => {
    return (
        <nav className="flex items-center justify-between align-center p-4">
            <div className="flex items-center">
                <h3 className="m-0 pl-2">TRST</h3>
            </div>
            <div className="flex items-center">
                <ModeToggle />
            </div>
        </nav>
    );
};

export default Nav;
