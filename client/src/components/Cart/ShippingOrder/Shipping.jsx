import React, { useState } from 'react';
import CheckoutSteps from './CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux';
import { Country, State } from 'country-state-city';
import { saveShippingInfo } from '../../../actions/cartAction';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import PhoneIcon from '@mui/icons-material/Phone';
import PublicIcon from '@mui/icons-material/Public';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';

const Shipping = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state?.cart);

  const [address, setAddress] = useState(shippingInfo?.address);
  const [city, setCity] = useState(shippingInfo?.city);
  const [state, setState] = useState(shippingInfo?.state);
  const [country, setCountry] = useState(shippingInfo?.country);
  const [pinCode, setPinCode] = useState(shippingInfo?.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo?.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      return;
    }

    dispatch(
      saveShippingInfo({
        address,
        city,
        state,
        country,
        pinCode,
        phoneNo,
      })
    );
    console.log({
      address,
      city,
      state,
      country,
      pinCode,
      phoneNo,
    });
    navigate('/order/confirm');
  };

  return (
    <>
      <CheckoutSteps activeStep={0} />

      <div>
        <div>
          <h2>Shipping Details</h2>

          <form onSubmit={(e) => shippingSubmit(e)}>
            <div>
              <label htmlFor="addressInput">
                <HomeIcon />
              </label>

              <input
                type="text"
                name="addressInput"
                id="addressInput"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="cityInput">
                <LocationCityIcon />
              </label>
              <input
                type="text"
                name="cityInput"
                id="cityInput"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="pinInput">
                <FmdGoodIcon />
              </label>
              <input
                type="number"
                name="pinInput"
                id="pinInput"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="phoneInput">
                <PhoneIcon />
              </label>
              <input
                type="number"
                name="phoneInput"
                id="phoneInput"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>

            <div>
              <label htmlFor="countryInput">
                <PublicIcon />
              </label>
              <select
                required
                name="countryInput"
                id="countryInput"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div>
                <label htmlFor="stateInput">
                  <TransferWithinAStationIcon />
                </label>
                <select
                  required
                  name="stateInput"
                  id="stateInput"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State?.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <button
              type="submit"
              disabled={state ? false : true}
              // onClick={(e) => console.log(e.target)}
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;
