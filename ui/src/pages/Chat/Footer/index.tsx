import { Button } from '@mui/material';
import { StyledFooter, StyledInput } from './style';
import useFooter from '../hooks/useFooter';

export type FooterPropTypes = {
  onSend: (msg: string) => void;
  setMessage: (msg: string) => void;
  onTyping: () => void;
  handleStopTyping: () => void;
  message: string;
};

export default function Footer(props: FooterPropTypes) {
  const { send, input } = useFooter(props);

  return (
    <StyledFooter onSubmit={send}>
      <StyledInput
        ref={input}
        onChange={(e) => props.setMessage(e.target.value)}
        onKeyDown={props.onTyping}
        value={props.message}
        placeholder="What would you like to say?"
      ></StyledInput>
      <Button
        onClick={send}
        style={{ borderLeft: 'none', padding: '.75rem' }}
        type="submit"
        variant="contained"
      >
        Send
      </Button>
    </StyledFooter>
  );
}
