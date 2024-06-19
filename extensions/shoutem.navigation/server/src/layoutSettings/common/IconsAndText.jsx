import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import i18next from 'i18next';
import { ControlLabel, Dropdown, MenuItem } from 'react-bootstrap';
import LOCALIZATION from './localization';

const SHOW_TEXT = 1;
const SHOW_ICON = 2;
const SHOW_TEXT_AND_ICON = SHOW_TEXT | SHOW_ICON;

const getDisplayOptionsText = (showText, showIcon) => {
  if (showText && showIcon) {
    return i18next.t(LOCALIZATION.OPTIONS_SHOW_TEXT_AND_ICONS);
  }
  if (showText) {
    return i18next.t(LOCALIZATION.OPTIONS_SHOW_TEXT_ONLY);
  }
  if (showIcon) {
    return i18next.t(LOCALIZATION.OPTIONS_SHOW_ICONS_ONLY);
  }
  return '';
};

export default class IconsAndText extends Component {
  constructor(props) {
    super(props);

    this.resolveCurrentOptions = this.resolveCurrentOptions.bind(this);
    this.handleDisplayOptionsSelected = this.handleDisplayOptionsSelected.bind(
      this,
    );
  }

  componentDidMount() {
    this.resolveCurrentOptions(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.resolveCurrentOptions(newProps);
  }

  resolveCurrentOptions(props) {
    const { settings, textOnlySupported, iconsOnlySupported } = props;

    const showIcon = _.get(settings, ['showIcon'], true);
    const showText = _.get(settings, ['showText'], true);

    if (!textOnlySupported && !showIcon) {
      // if text only is not supported, 'turn on' icons
      this.props.onSettingsChanged({ showIcon: true });
    }

    if (!iconsOnlySupported && !showText) {
      // if icons only is not supported, 'turn on' text
      this.props.onSettingsChanged({ showText: true });
    }
  }

  handleDisplayOptionsSelected(event) {
    const { onSettingsChanged } = this.props;
    const newSettings = {
      showText: (event & SHOW_TEXT) === SHOW_TEXT,
      showIcon: (event & SHOW_ICON) === SHOW_ICON,
    };
    onSettingsChanged(newSettings);
  }

  render() {
    const { settings, textOnlySupported, iconsOnlySupported } = this.props;
    const showIcon = _.get(settings, ['showIcon'], true);
    const showText = _.get(settings, ['showText'], true);

    return (
      <div>
        <ControlLabel>
          {i18next.t(LOCALIZATION.FORM_ICONS_AND_TEXT)}
        </ControlLabel>
        <Dropdown
          onSelect={this.handleDisplayOptionsSelected}
          className="block"
        >
          <Dropdown.Toggle>
            {getDisplayOptionsText(showText, showIcon)}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {textOnlySupported && (
              <MenuItem key={SHOW_TEXT} eventKey={SHOW_TEXT}>
                {getDisplayOptionsText(true, false)}
              </MenuItem>
            )}
            {iconsOnlySupported && (
              <MenuItem key={SHOW_ICON} eventKey={SHOW_ICON}>
                {getDisplayOptionsText(false, true)}
              </MenuItem>
            )}
            <MenuItem key={SHOW_TEXT_AND_ICON} eventKey={SHOW_TEXT_AND_ICON}>
              {getDisplayOptionsText(true, true)}
            </MenuItem>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

IconsAndText.propTypes = {
  settings: PropTypes.object.isRequired,
  onSettingsChanged: PropTypes.func.isRequired,
  textOnlySupported: PropTypes.bool,
  iconsOnlySupported: PropTypes.bool,
};

IconsAndText.defaultProps = {
  textOnlySupported: true,
  iconsOnlySupported: true,
};
