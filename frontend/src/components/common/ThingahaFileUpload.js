import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'

const Preview = ({ file, name }) => {
  const [loadingState, setLoadingState] = useState({
    loading: true,
    thumb: null,
  })

  useEffect(() => {
    if (!file) {
      return
    }

    let reader = new FileReader()

    reader.onloadend = () => {
      setLoadingState({
        loading: false,
        thumb: reader.result,
      })
    }

    reader.readAsDataURL(file)

    return () => {}
  }, [file])

  if (loadingState.loading) {
    return <p>loading...</p>
  }

  return (
    <img
      src={loadingState.thumb}
      alt={name}
      className="img-thumbnail mt-2"
      height={200}
    />
  )
}

const Wrapper = styled.fieldset`
  display: flex;
  flex-direction: column;
  width: 100%;

  label {
    margin-bottom: 2rem;
  }

  img {
    max-width: 100%;
    width: auto;
    height: auto;
  }
`

const HiddenFileInput = styled.input`
  display: none;
`

const ThingahaFileUpload = ({ file, ...fileProps }) => {
  return (
    <Wrapper>
      <label htmlFor={fileProps.name}>
        <HiddenFileInput {...fileProps} />
        <Fab
          color="default"
          size="small"
          component="span"
          aria-label="add"
          variant="extended"
        >
          <AddIcon /> Upload photo
        </Fab>
      </label>
      <Preview file={file} name={fileProps.name} />
    </Wrapper>
  )
}

export default ThingahaFileUpload
