import React = require('react');
import {render, cleanup, fireEvent, waitFor} from '@testing-library/react';
import '../../../src/themes/default';
import {render as amisRender} from '../../../src/index';
import {makeEnv, wait} from '../../helper';
import {clearStoresCache} from '../../../src/factory';

afterEach(() => {
  cleanup();
  clearStoresCache();
});

test('Form:initData', async () => {
  const onSubmit = jest.fn();
  const {container, getByText} = render(
    amisRender(
      {
        type: 'form',
        title: 'The form',
        wrapWithPanel: false,
        body: [
          {
            type: 'input-text',
            name: 'a',
            value: '1'
          },
          {
            type: 'input-text',
            name: 'b',
            value: '2'
          },
          {
            type: 'submit',
            label: 'Submit'
          }
        ]
      },
      {
        onSubmit
      },
      makeEnv()
    )
  );

  expect(container).toMatchSnapshot();

  fireEvent.click(getByText(/Submit/));
  await wait(500);

  expect(onSubmit).toBeCalled();
  expect(onSubmit.mock.calls[0][0]).toMatchSnapshot();
});

test('Form:initData:super', async () => {
  const onSubmit = jest.fn();
  const {container, getByText} = render(
    amisRender(
      {
        type: 'page',
        data: {
          a: 1,
          b: 2
        },
        body: {
          type: 'form',
          title: 'The form',
          wrapWithPanel: false,
          onSubmit,
          body: [
            {
              type: 'input-text',
              name: 'a'
            },
            {
              type: 'input-text',
              name: 'b'
            },
            {
              type: 'submit',
              label: 'Submit'
            }
          ]
        }
      },
      {},
      makeEnv()
    )
  );

  expect(container).toMatchSnapshot();

  fireEvent.click(getByText(/Submit/));
  await wait(500);

  expect(onSubmit).toBeCalled();
  expect(onSubmit.mock.calls[0][0]).toMatchInlineSnapshot(
    `
    Object {
      "a": 1,
      "b": 2,
    }
  `
  );
});

test('Form:initData:without-super', async () => {
  const onSubmit = jest.fn();
  const {container, getByText} = render(
    amisRender(
      {
        type: 'page',
        data: {
          a: 1,
          b: 2
        },
        body: {
          type: 'form',
          title: 'The form',
          wrapWithPanel: false,
          onSubmit,
          canAccessSuperData: false,
          body: [
            {
              type: 'input-text',
              name: 'a'
            },
            {
              type: 'input-text',
              name: 'b'
            },
            {
              type: 'submit',
              label: 'Submit'
            }
          ]
        }
      },
      {},
      makeEnv()
    )
  );

  // 这个应该是不能设置上初始值的
  expect(container).toMatchSnapshot();

  fireEvent.click(getByText(/Submit/));
  await wait(500);

  expect(onSubmit).toBeCalled();
  expect(onSubmit.mock.calls[0][0]).toMatchSnapshot();
});

test('Form:initData:remote', async () => {
  const resultPromise = Promise.resolve({
    data: {
      status: 0,
      msg: 'ok',
      data: {
        a: 1,
        b: 2
      }
    }
  });
  const onSubmit = jest.fn();
  const fetcher = jest.fn().mockImplementation(() => resultPromise);
  const {container, getByText} = render(
    amisRender(
      {
        type: 'form',
        initApi: '/api/xxx?a=${a}',
        controls: [
          {
            type: 'text',
            name: 'a',
            label: 'Label',
            value: '123'
          }
        ],
        title: 'The form',
        onSubmit,
        actions: [
          {
            type: 'submit',
            label: 'Submit'
          }
        ]
      },
      {},
      makeEnv({
        fetcher
      })
    )
  );
  expect(container).toMatchSnapshot();
  await wait(300);

  await resultPromise;
  await wait(300);

  expect(fetcher).toHaveBeenCalled();
  expect(fetcher.mock.calls[0][0]).toMatchSnapshot();

  expect(container).toMatchSnapshot();

  fireEvent.click(getByText('Submit'));
  await wait(500);
  expect(onSubmit).toBeCalled();
  expect(onSubmit.mock.calls[0][0]).toMatchSnapshot();
});

// 主要用来测试 form 的 source 接口是否在 initApi 后调用
// 并且发送的参数是否可以携带 initApi 返回的数据
// 并且 source 接口如果返回了 value 是否可以应用上。
test('Form:initData:remote:options:source', async () => {
  const initApiPromise = Promise.resolve({
    data: {
      status: 0,
      msg: 'ok',
      data: {
        id: 1
      }
    }
  });
  const fetcherinitApi = jest.fn().mockImplementation(() => initApiPromise);
  const sourceApiPromise = Promise.resolve({
    data: {
      status: 0,
      msg: 'ok',
      data: {
        value: 'b',
        options: [
          {
            label: 'OptionA',
            value: 'a'
          },
          {
            label: 'OptionB',
            value: 'b'
          }
        ]
      }
    }
  });
  const fetcherSourceApi = jest.fn().mockImplementation(() => sourceApiPromise);
  const onSubmit = jest.fn();
  const fetcher = (arg1: any, ...rest: Array<any>) => {
    const api = /\/api\/(\w+)/.test(arg1.url) ? RegExp.$1 : '';
    const map: any = {
      initApi: fetcherinitApi,
      source: fetcherSourceApi
    };

    return map[api](arg1, ...rest);
  };
  const {container, getByText} = render(
    amisRender(
      {
        type: 'form',
        initApi: '/api/initApi?op=${op}',
        controls: [
          {
            type: 'hidden',
            name: 'op',
            value: 'init'
          },
          {
            type: 'select',
            name: 'a',
            label: 'Select',
            source: '/api/source?id=${id}'
          }
        ],
        title: 'The form',
        onSubmit,
        actions: [
          {
            type: 'submit',
            label: 'Submit'
          }
        ]
      },
      {},
      makeEnv({
        fetcher
      })
    )
  );

  await initApiPromise;
  await waitFor(() => expect(fetcherinitApi).toHaveBeenCalled());
  expect(fetcherinitApi.mock.calls[0][0].url).toEqual('/api/initApi?op=init');

  await sourceApiPromise;
  await waitFor(() => expect(fetcherSourceApi).toHaveBeenCalled());
  // 这里要取 mock.call[1] 而不是 [0]，因为这里其实会调用两次，第一次被cancel了
  expect(fetcherSourceApi.mock.calls[1][0].url).toEqual('/api/source?id=1');

  fireEvent.click(getByText('Submit'));
  await waitFor(() => expect(onSubmit).toBeCalled());
  expect(onSubmit.mock.calls[0][0]).toMatchObject({
    id: 1,
    op: 'init',
    a: 'b'
  });
});
