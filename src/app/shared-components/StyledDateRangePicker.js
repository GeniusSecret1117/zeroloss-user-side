import { styled } from '@mui/material';
import { DateRangePicker } from 'react-date-range';

const StyledDateRangePicker = styled(DateRangePicker)(({ theme, resetElPos = 6 }) => ({
  display: 'flex',
  flexDirection: 'column-reverse',
  '&.rdrDateRangePickerWrapper': {
    display: 'block !important',
  },
  '&.hide-toolbar .rdrStaticRanges': {
    display: 'none',
  },
  '.rdrMonthAndYearWrapper': {
    position: 'absolute',
    left: 10,
    right: 13,
    top: -13,
    color: '#3D3D3D',
  },
  '.rdrMonthName': {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 500,
    color: theme.palette.text.primary,
  },
  '& .rdrMonth': {
    width: 275,
    '&:first-of-type': {
      borderRight: `1px solid ${theme.palette.text.primary}`,
    },
  },
  '& .rdrMonthAndYearPickers': {
    display: 'none',
  },
  '& .rdrDefinedRangesWrapper': {
    width: '100%',
    '.rdrInputRanges': {
      display: 'none',
    },
    '.rdrStaticRanges': {
      flexDirection: 'row',
      padding: '6px 8px',
      borderTop: `1px solid ${theme.palette.text.primary_5}`,
      background: '#F5F5F5',
      '& .rdrStaticRange': {
        [`&:nth-of-type(${resetElPos})`]: {
          background: theme.palette.text.primary_5,
          display: 'flex',
          height: '36px',
          '&:before': {
            content:
              'url(\'data:image/svg+xml,<svg width="12" height="14" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 14"><path d="M1.33301 7.66667C1.33301 10.244 3.42235 12.3333 5.99967 12.3333C8.577 12.3333 10.6663 10.244 10.6663 7.66667C10.6663 5.08934 8.577 3 5.99967 3H2.66634M2.66634 3L4.66634 1M2.66634 3L4.66634 5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="' +
              theme.palette.text.primary +
              '"></path></svg>\')',
            paddingTop: 2,
          },
        },
      },
    },
  },
  '& .rdrStaticRange, .rdrDefinedRangesWrapper ': {
    background: theme.palette.background.paper,
    border: 'none',
    color: theme.palette.background.bg_color,
  },
  '& .rdrDateDisplayWrapper': {
    display: 'none',
    background: theme.palette.background.paper,
    '& .rdrDateDisplayItem': {
      background: '#242424',
      color: 'transparent',
      borderColor: 'none',
    },
    '& .rdrDateDisplayItemActive input, .rdrDateDisplayItem input': {
      color: theme.palette.background.bg_color,
    },
  },
  '& .rdrWeekDay': {
    color: theme.palette.text.primary_30,
  },
  '& .rdrDayPassive .rdrDayNumber span': {
    color: theme.palette.text.primary_10,
  },
  '& .rdrCalendarWrapper': {
    background: theme.palette.background.paper,
    position: 'relative',
  },
  '& .rdrDayNumber span': {
    color: theme.palette.background.bg_color,
    fontSize: 12,
    fontWeight: `500 !important`,
  },
  '& .rdrEndEdge, .rdrStartEdge, .rdrDay .rdrInRange, .rdrDayStartPreview, .rdrDayInPreview, .rdrDayEndPreview':
    {
      borderColor: '#242424',
    },
  '& .rdrDayHovered span, .rdrDayStartPreview span, .rdrDayEndPreview span, .rdrDayInPreview span':
    {
      borderColor: 'none !important',
      border: 'none',
    },
  '& .rdrStartEdge': {
    color: `#242424 !important`,
    borderRadius: '6px',
    margin: '4px',
    bottom: 2,
    top: 2,
  },
  '& .rdrEndEdge': {
    color: `#242424 !important`,
    borderRadius: '6px !important',
    margin: '4px',
    bottom: 2,
    top: 2,
  },
  '& .rdrEndEdge.rdrStartEdge': {
    color: `#242424 !important`,
    bottom: 2,
    top: 2,
    borderRadius: '6px',
    margin: '4px',
  },
  '& .rdrDay .rdrInRange': {
    bottom: 2,
    top: 2,
    color: `#F2F2F2 !important`,
    borderRadius: '6px',
    margin: '4px',
  },
  '& .rdrDay:not(.rdrDayPassive) .rdrInRange ~ .rdrDayNumber span, .rdrDay:not(.rdrDayPassive) .rdrStartEdge ~ .rdrDayNumber span, .rdrDay:not(.rdrDayPassive) .rdrEndEdge ~ .rdrDayNumber span, .rdrDay:not(.rdrDayPassive) .rdrSelected ~ .rdrDayNumber span':
    {
      color: theme.palette.background.bg_color,
    },
  '& .rdrDayToday .rdrDayNumber span:after': {
    background: 'none !important',
  },
  '& .rdrInRange~.rdrDayNumber span': {
    color: '#242424 !important',
  },
  '& .rdrStartEdge~.rdrDayNumber span, .rdrEndEdge~.rdrDayNumber span': {
    color: 'white !important',
  },
  // "& .rdrInputRange input": {
  //   background: theme.palette.background.paper,
  //   borderColor: theme.palette.background.default,
  //   color: theme.palette.text.primary,
  // },
  // "& .rdrMonthPicker select, .rdrYearPicker select": {
  //   color: theme.palette.text.primary,
  //   fontSize: 14,
  //   fontWeight: 500,
  //   textAlign: "left",
  // },
  '& .rdrNextPrevButton': {
    background: 'transparent',
  },
  '& .rdrStaticRange': {
    padding: '2px 4px',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '4px',
    background: theme.palette.background.paper,
    color: '#242424',
    fontSize: 10,
    fontWeight: 500,
    marginRight: 8,
    span: {
      padding: 0,
    },
  },
  '& .rdrStaticRangeSelected': {
    fontWeight: '500 !important',
  },
  '& .rdrStaticRangeSelected span': {
    color: theme.palette.text.primary,
  },
  '& .rdrStaticRange:hover .rdrStaticRangeLabel': {
    background: 'transparent',
  },
  '& .rdrStaticRange:hover': {
    background: theme.palette.background.bg_5,
    border: 'unset !important',
  },
  '& .rdrDayDisabled': {
    backgroundColor: 'unset',
    color: '#DADADA',
  },
  '& .rdrDayDisabled span': {
    color: '#DADADA !important',
  },
  '& .rdrDayEndOfMonth .rdrInRange,.rdrDayEndOfMonth .rdrStartEdge, .rdrDayEndOfWeek .rdrInRange, .rdrDayEndOfWeek .rdrStartEdge':
    {
      borderTopRightRadius: '6px !important',
      borderBottomRightRadius: '6px !important',
    },
}));

export default StyledDateRangePicker;
