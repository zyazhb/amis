import React = require('react');
import {render} from '@testing-library/react';
import '../../src/themes/default';
import {render as amisRender} from '../../src/index';
import {makeEnv} from '../helper';

test('Renderer:alert', () => {
  const {container} = render(
    amisRender(
      {
        type: 'page',
        body: {
          type: 'alert',
          level: 'success',
          body: [
            {
              type: 'tpl',
              tpl: '提示内容'
            }
          ]
        }
      },
      {},
      makeEnv({})
    )
  );

  expect(container).toMatchSnapshot();
});

test('Renderer:alert var', () => {
  const {container} = render(
    amisRender(
      {
        type: 'page',
        data: {
          level: 'success',
          icon: 'copy',
          showIcon: true
        },
        body: {
          type: 'alert',
          level: '${level}',
          icon: '${icon}',
          showIcon: '${showIcon}',
          body: 'tpl'
        }
      },
      {},
      makeEnv({})
    )
  );

  expect(container).toMatchSnapshot();
});
