import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} px={0}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

const ThingahaTabbedNav = ({ tabMenus, tabPanels, defaultIndex, centered }) => {
  const [value, setValue] = useState(defaultIndex || 0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered={centered}
      >
        {tabMenus.map((label) => {
          return <Tab label={label} />
        })}
      </Tabs>
      {tabPanels.map((content, index) => {
        return (
          <TabPanel value={value} index={index}>
            {content}
          </TabPanel>
        )
      })}
    </div>
  )
}

export default ThingahaTabbedNav
