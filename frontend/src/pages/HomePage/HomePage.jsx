// src/pages/HomePage/HomePage.jsx

import Banner from '../../components/Banner/Banner'
import CategoriesSection from '../../components/CategoriesSection/CategoriesSection'
import DiscountBanner from '../../components/DiscountBanner/DiscountBanner'
import SaleSection from '../../components/SaleSection/SaleSection'

export default function HomePage() {
  return (
    <>
      <Banner />
      <CategoriesSection /> 
      <DiscountBanner />   
      <SaleSection />
    </>
  );
}