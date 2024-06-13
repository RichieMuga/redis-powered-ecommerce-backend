export const filterUserUpdateData = (data: any) => {
  const { password, address, ...filteredData } = data;
  if (address) {
    const { geolocation, number, zipcode, ...filteredAddress } = address;
    filteredData.address = filteredAddress;
  }
  return filteredData;
};

