import { SyntheticEvent, useCallback, useEffect, useRef } from 'react';
import { FooterPropTypes } from '../Footer';

export default function useFooter(props: FooterPropTypes) {
  useEffect(() => {
    const delay = setTimeout(() => {
      props.handleStopTyping();
    }, 3000);

    return () => clearTimeout(delay);
  }, [props, props.message]);
  const input = useRef<null | HTMLInputElement>(null);

  const send = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      props.onSend(props.message);
      props.handleStopTyping();
    },
    [props],
  );

  useEffect(() => {
    input.current?.querySelector('input')?.focus();
  }, []);
  return {
    send,
    input,
  };
}
