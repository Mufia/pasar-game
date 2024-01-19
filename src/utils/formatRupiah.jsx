import React from 'react';

function FormatRupiah({ value }) {
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });

  return <span>{formatter.format(value)}</span>;
}

export default FormatRupiah;