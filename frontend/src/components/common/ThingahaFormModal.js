import React from 'react'
import styled from 'styled-components'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

const ModalContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const ThingahaFormModal = ({
  children,
  open,
  onCancel,
  onSubmit,
  onClose,
  title,
}) => {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" fullWidth>
      <DialogTitle id="form-dialog-title" align="center">
        {title}
      </DialogTitle>
      <DialogContent>
        <ModalContentContainer>{children}</ModalContentContainer>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onCancel} color="secondary">
          Cancel
        </Button>
        <Button variant="contained" onClick={onSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ThingahaFormModal
