import { ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Hidden from '@mui/material/Hidden';
import Toolbar from '@mui/material/Toolbar';
import clsx from 'clsx';
import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectFuseCurrentLayoutConfig, selectToolbarTheme } from 'app/store/fuse/settingsSlice';
import { selectFuseNavbar } from 'app/store/fuse/navbarSlice';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import NotificationPanelToggleButton from '../../shared-components/notificationPanel/NotificationPanelToggleButton';
import NavbarToggleButton from '../../shared-components/NavbarToggleButton';
import UserMenu from '../../shared-components/UserMenu';

function ToolbarLayout1(props) {
  const config = useSelector(selectFuseCurrentLayoutConfig);
  const navbar = useSelector(selectFuseNavbar);
  const toolbarTheme = useSelector(selectToolbarTheme);

  const [searchText, setSearchText] = useState('');

  function handleSearchText(event) {
    setSearchText(event.target.value);
  }

  return (
    <ThemeProvider theme={toolbarTheme}>
      <AppBar
        id="fuse-toolbar"
        className={clsx(
          'flex relative z-20 shadow-md h-[80px] bg-[#D7ECE2] justify-center',
          props.className
        )}
        color="default"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? toolbarTheme.palette.background.paper
              : toolbarTheme.palette.background.default,
        }}
        position="static"
      >
        <Toolbar className="p-0 min-h-48 md:min-h-64 md:px-[48px] px-[24px]">
          <div className="flex flex-1">
            {config.navbar.display && config.navbar.position === 'left' && (
              <>
                <Hidden lgDown>
                  {(config.navbar.style === 'style-3' ||
                    config.navbar.style === 'style-3-dense') && (
                    <NavbarToggleButton className="w-40 h-40 p-0 mx-0" />
                  )}

                  {config.navbar.style === 'style-1' && !navbar.open && (
                    <NavbarToggleButton className="w-40 h-40 p-0 mx-0" />
                  )}
                </Hidden>

                <Hidden lgUp>
                  <NavbarToggleButton className="w-40 h-40 p-0 mx-0 sm:mx-8" />
                </Hidden>
              </>
            )}

            <Hidden lgDown>
              <Paper className="flex p-4 items-center w-full px-16 py-4 border-1 h-40 rounded-[16px] bg-[#F0FEF7] shadow-none max-w-[350px]">
                <FuseSvgIcon size={20}>heroicons-solid:search</FuseSvgIcon>

                <Input
                  placeholder="Search here"
                  className="flex flex-1 px-8"
                  disableUnderline
                  fullWidth
                  value={searchText}
                  inputProps={{
                    'aria-label': 'Search',
                  }}
                  sx={{
                    '& input::placeholder': {
                      color: '#032123',
                      opacity: 1,
                    },
                  }}
                  onChange={handleSearchText}
                />
              </Paper>
            </Hidden>
          </div>

          <div className="flex items-center px-8 h-full overflow-x-auto gap-x-8">
            <NotificationPanelToggleButton />
            <div className="w-[1px] h-full bg-[#C7D7CD]" />
            <UserMenu />
          </div>

          {config.navbar.display && config.navbar.position === 'right' && (
            <>
              <Hidden lgDown>
                {!navbar.open && <NavbarToggleButton className="w-40 h-40 p-0 mx-0" />}
              </Hidden>

              <Hidden lgUp>
                <NavbarToggleButton className="w-40 h-40 p-0 mx-0 sm:mx-8" />
              </Hidden>
            </>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default memo(ToolbarLayout1);
