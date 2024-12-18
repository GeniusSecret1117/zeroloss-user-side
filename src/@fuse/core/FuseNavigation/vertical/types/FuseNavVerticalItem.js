import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import { alpha, styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import FuseNavBadge from '../../FuseNavBadge';

const Root = styled(ListItem)(({ theme, ...props }) => ({
  minHeight: 44,
  width: '100%',
  borderRadius: '6px',
  margin: '0 0 4px 0',
  paddingRight: 16,
  paddingLeft: props.itempadding > 80 ? 80 : props.itempadding,
  paddingTop: 10,
  paddingBottom: 10,
  color: alpha(theme.palette.text.primary, 0.7),
  cursor: 'pointer',
  textDecoration: 'none!important',
  '&:hover': {
    color: theme.palette.text.primary,
  },
  '&.active': {
    color: theme.palette.text.primary,
    backgroundColor: '#1E6569',
    pointerEvents: 'none',
    transition: 'border-radius .15s cubic-bezier(0.4,0.0,0.2,1)',
    '& > .MuiSvgIcon-root': {
      color: 'inherit',
    },
    '& > .fuse-list-item-text': {
      '& > .fuse-list-item-text-primary': {
        color: '#F3F9F7',
        fontWeight: 700,
      },
    },
  },
  '& >.MuiSvgIcon-root': {
    marginRight: 16,
    color: 'inherit',
  },
  '& > .fuse-list-item-text': {
    '& > .fuse-list-item-text-primary': {
      color: '#B7BDC6',
      fontWeight: 400,
    },
  },
}));

function FuseNavVerticalItem(props) {
  const { item, nestedLevel, onItemClick } = props;

  const itempadding = nestedLevel > 0 ? 38 + nestedLevel * 16 : 16;

  return useMemo(
    () => (
      <>
        <Root
          button
          component={NavLinkAdapter}
          to={item.url || ''}
          activeClassName={item.url ? 'active' : ''}
          className={clsx('fuse-list-item', item.active && 'active')}
          onClick={() => onItemClick && onItemClick(item)}
          end={item.end}
          itempadding={itempadding}
          role="button"
          sx={item.sx}
          disabled={item.disabled}
        >
          {item.icon && item.icon}

          <ListItemText
            className="fuse-list-item-text"
            primary={item.title}
            secondary={item.subtitle}
            classes={{
              primary: 'text-[16px] fuse-list-item-text-primary truncate',
              secondary:
                'text-11 font-medium fuse-list-item-text-secondary leading-normal truncate',
            }}
          />
          {item.badge && <FuseNavBadge badge={item.badge} />}
        </Root>
        {item.divide && item.divide}
      </>
    ),
    [item, itempadding, onItemClick]
  );
}

FuseNavVerticalItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    icon: PropTypes.node,
    url: PropTypes.string,
    divide: PropTypes.node,
  }),
};

FuseNavVerticalItem.defaultProps = {};

const NavVerticalItem = FuseNavVerticalItem;

export default NavVerticalItem;
