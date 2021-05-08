import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import LocalAtmIcon from '@material-ui/icons/LocalAtm'
import { Grid } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import { Button } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { formatMMK } from '../../utils/formatCurrency'
import ExtraFundForm from './ExtraFundForm'
import ExtrafundCard from './ExtraFundCard'
import ThingahaInfoCard from '../common/ThingahaInfoCard'
import values from 'lodash/values'

//TODO: localize
const labelExtraFunds = 'Extra Funds'
const labelCurrentExtraFunds = 'Current Extra Funds'
const labelFiscalYear = 'Fiscal Year'
const labelAddExtraFunds = 'Add Extra Funds'
const labelNoRecordTitle = 'No records'
const labelNoRecordMessage =
  'Sorry, there are no extra fund records for this year at the moment.'

const ExtraFunds = ({ extraFunds, newTransfers, getAllExtraFunds }) => {
  useEffect(() => {
    getAllExtraFunds()
  }, [getAllExtraFunds])

  const date = new Date()
  const currentYear = date.getFullYear()
  const currentExtrafunds =
    extraFunds.length > 0 ? extraFunds[extraFunds.length - 1].mmk_amount : ''
  let addButtonDisabled = newTransfers.length > 0 ? false : true

  const [year, setYear] = React.useState(currentYear)

  //data filtered by year
  var extraFundsListByYear = ''
  const dataFilterByYear = (selectedyear) => {
    extraFundsListByYear = extraFunds.filter(
      (extraFunds) => extraFunds.transfer.year == selectedyear
    )
  }
  //initial assign
  dataFilterByYear(year)

  const handleChange = (event) => {
    //dataFilterByYear(year) will call again, bcoz of setYear useState changed
    setYear(event.target.value)
  }

  //fetch years for fiscal year dropdown
  var yearArray = []
  for (var key in extraFunds) {
    var value = extraFunds[key]
    yearArray.push(value.transfer.year)
  }
  //ES6 remove array duplicates
  yearArray = [...new Set(yearArray)]
  //current year record not include in database, add for dropdown
  if (!yearArray.includes(currentYear)) {
    yearArray.push(currentYear)
  }

  const [extraFundFormVisible, setExtraFundFormVisible] = useState(false)
  const [editExtraFundValue, setEditExtraFundValue] = useState(null)

  return (
    <div>
      {/* Title */}
      <Grid
        style={{ marginBottom: '10px' }}
        container
        direction="row"
        alignItems="center"
      >
        <Grid item>
          <LocalAtmIcon />
        </Grid>
        <Grid item>{labelExtraFunds}</Grid>
      </Grid>

      {/* Years drop-down and Current funds amount #Start*/}
      <Grid
        style={{ marginBottom: '10px' }}
        container
        direction="row"
        alignItems="center"
        justify="space-between"
      >
        <Grid item className="MuiGrid-justify-xs-flex-end">
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <Grid item>
              <InputLabel id="fiscalyear">{labelFiscalYear} </InputLabel>
            </Grid>
            <Grid item style={{ marginLeft: '1em' }}>
              <FormControl>
                <Select
                  labelId="fiscalyear"
                  id="selectfiscalyear"
                  value={year}
                  onChange={handleChange}
                >
                  {yearArray.map((year, index) => {
                    return (
                      <MenuItem key={index} value={year}>
                        {year}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item className="MuiGrid-justify-xs-flex-end">
          {labelCurrentExtraFunds} : {formatMMK(currentExtrafunds)}
        </Grid>
      </Grid>
      {/* Years drop-down and Current funds amount #End*/}

      {/* Extra Funds Create button */}
      <Grid style={{ marginBottom: '10px' }} container>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleIcon />}
            disabled={addButtonDisabled}
            onClick={() => {
              setEditExtraFundValue(false)
              setExtraFundFormVisible(true)
            }}
          >
            {labelAddExtraFunds}
          </Button>
        </Grid>
      </Grid>

      {/* Extra Funds Create/Edit Form */}
      {extraFundFormVisible ? (
        <ExtraFundForm
          visible={extraFundFormVisible}
          setVisible={setExtraFundFormVisible}
          editExtraFundValue={editExtraFundValue}
          newTransfers={newTransfers}
        />
      ) : null}

      {/* Extra Funds List Items */}
      <Grid container>
        <Grid item xs={12}>
          {extraFundsListByYear.length > 0 ? (
            extraFundsListByYear.map((extraFund, index) => {
              var transferLink = `/transfers/${extraFund.transfer.id}`
              return (
                <ExtrafundCard
                  key={index}
                  extraFund={extraFund}
                  link={transferLink}
                  onEdit={(edit) => {
                    setEditExtraFundValue(edit)
                    setExtraFundFormVisible(true)
                  }}
                />
              )
            })
          ) : (
            <ThingahaInfoCard
              title={labelNoRecordTitle}
              message={labelNoRecordMessage}
            />
          )}
        </Grid>
      </Grid>
    </div>
  )
}

const getExtraFundList = (state) => {
  return values(state.extraFunds.extraFunds)
}

const getNewTransfers = (state) => {
  return values(state.extraFunds.newTransfers)
}

const mapStateToProps = (state) => ({
  extraFunds: getExtraFundList(state),
  newTransfers: getNewTransfers(state),
})

const mapDispatchToProps = (dispatch) => {
  return {
    getAllExtraFunds: () => dispatch(actions.fetchExtraFunds()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExtraFunds)
