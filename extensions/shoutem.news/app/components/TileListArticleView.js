import React from 'react';
import moment from 'moment';
import {
  Caption,
  Divider,
  ImageBackground,
  Tile,
  Title,
  TouchableOpacity,
} from '@shoutem/ui';
import { assets } from 'shoutem.layouts';
import { ArticleView } from './ArticleView';

export class TileListArticleView extends ArticleView {
  render() {
    const {
      disableUppercasing,
      hideModificationTimestamp,
      title,
      imageUrl,
      date,
    } = this.props;

    const articleImage = imageUrl
      ? { uri: imageUrl }
      : assets.noImagePlaceholder;

    const momentDate = moment(date);
    const dateInfo =
      momentDate.isAfter(0) && !hideModificationTimestamp ? (
        <Caption>{momentDate.fromNow()}</Caption>
      ) : null;
    const resolvedTitle = disableUppercasing ? title : title.toUpperCase();

    return (
      <TouchableOpacity onPress={this.onPress}>
        <ImageBackground
          styleName="large-banner placeholder"
          source={articleImage}
        >
          <Tile>
            <Title numberOfLines={3}>{resolvedTitle}</Title>
            {dateInfo}
          </Tile>
        </ImageBackground>
        <Divider styleName="line" />
      </TouchableOpacity>
    );
  }
}
