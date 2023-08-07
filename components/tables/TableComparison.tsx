import React from "react";
import { Box } from "@mui/material";
import {
  DataComparison,
  TableComparisonProps,
} from "@/interfaces/tableComparison.interface";

export default function TableComparison({ title, data }: TableComparisonProps) {
  return (
    <Box className="tw-pt-8">
      <h3 className="tw-mb-4 tw-text-lg tw-font-semibold">{title}</h3>
      <table className="md:tw-w-5/6">
        <tbody>
          {data.map((compare: DataComparison, index: number) => (
            <tr key={`compare-${index}`}>
              <td className="tw-py-2">{compare.name}</td>
              <td className="tw-py-2">{compare.product1}</td>
              <td className="tw-py-2">{compare.product2}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
}
