import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Box, Button, Popover, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

export interface LanguagePickerProps {
  showText?: boolean;
  onLanguageChange?: (lang: string) => void;
}

export default function LanguagePicker(props: Readonly<LanguagePickerProps>) {
  const { showText, onLanguageChange } = props;
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language);
  // const [open, setOpen] = React.useState(false);
  const changeLanguage = (lng: any, value: CountryType | null) => {
    if (value !== null) {
      i18n.changeLanguage(value.languageSymbol);
      setLang(value.languageSymbol);
      handleClose();
      if (onLanguageChange)
        onLanguageChange(value.languageSymbol);
      // window.location.reload();

    }
  };
  const params = useParams();
  useEffect(() => {
    if (params['lang'])
      if (i18n.language !== params['lang'])
        setLang(params['lang'])

  }, [i18n.language, params]);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleUserMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const openUserMenu = Boolean(anchorEl);
  // const id = open ? 'simple-popover' : undefined;
  if (countries !== undefined) {
    let countryAct = countries.find(x => x.languageSymbol == lang);
    if (countryAct !== undefined && countryAct !== null)
      return (
        <div>
          <div style={{ display: 'flex' }}>
            <Button onClick={handleUserMenuClick}>
              <img
                loading="lazy"
                width="24"
                src={`https://flagcdn.com/w20/${countries.find(x => x.languageSymbol == lang)!.code.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/w40/${countries.find(x => x.languageSymbol == lang)!.code.toLowerCase()}.png 2x`}
                alt=""
              />
            </Button>
            {showText && <Typography variant='caption' sx={{ marginLeft: '-10px', marginTop: '5px', fontWeight: 'bold', fontSize: 'small' }}>
              <span style={{ cursor: 'pointer' }} onClick={handleUserMenuClick}>{countryAct.label}</span>
            </Typography>
            }
          </div>
          <Popover
            id={'simple-popover'}
            sx={{ zIndex: '50002' }}
            open={openUserMenu}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <div className="popup-content-div" >
              <div>{
                countries.map((country) => {
                  return (
                    <div key={country.code}>
                      <Button sx={{ margin: '4px' }} onClick={(e) => { changeLanguage(e, country) }}>
                        <img style={{ marginRight: '8px' }}
                          loading="lazy"
                          width="20"
                          src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                          srcSet={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png 2x`}
                          alt=""
                        />
                        {country.label}
                      </Button>
                    </div>);
                })}


              </div>



            </div>
          </Popover>
        </div>

      );
    else return (
      <div>
        <Button onClick={handleUserMenuClick}>
          <img
            loading="lazy"
            width="24"
            src={`https://flagcdn.com/w20/${countries[0].code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${countries[0].code.toLowerCase()}.png 2x`}
            alt=""
          />
        </Button>
        <Popover
          id={'simple-popover'}
          open={openUserMenu}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <div className="popup-content-div" >
            <div>{
              countries.map((country) => {
                return (
                  <Box key={country.code}>
                    <Button sx={{ margin: '4px' }} onClick={(e) => { changeLanguage(e, country) }}>
                      <img style={{ marginRight: '8px' }}
                        loading="lazy"
                        width="20"
                        src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                        srcSet={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png 2x`}
                        alt=""
                      />
                      {country.label}
                    </Button>
                  </Box>);
              })}


            </div>



          </div>
        </Popover>
      </div>

    );
  }
  else return <div>{lang}</div>;

}

interface CountryType {
  code: string;
  label: string;
  languageSymbol: string;
}

// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
const countries: readonly CountryType[] = [
  {
    code: 'CZ',
    label: 'Čeština',
    languageSymbol: 'cs'
  },
  {
    code: 'US',
    languageSymbol: 'en',
    label: 'English',
  },
];
