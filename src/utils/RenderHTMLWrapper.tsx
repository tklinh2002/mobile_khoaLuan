import React from 'react';
import RenderHTML from 'react-native-render-html';

const RenderHTMLWrapper = ({ contentWidth, source, ...props }) => {
  // Đặt giá trị mặc định cho props
  const defaultProps = {
    contentWidth: 200,
    source: { html: '' },
  };

  return (
    <RenderHTML
      contentWidth={contentWidth || defaultProps.contentWidth}
      source={source || defaultProps.source}
      {...props}
    />
  );
};

export default RenderHTMLWrapper;