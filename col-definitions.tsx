import type { GridRenderCellParams } from "@mui/x-data-grid";
import type { DataItem } from "@/types"; // ← Fully generic type name + path alias

import {
    Box,
    Typography,
    Link as MuiLink,
} from '@mui/material';

import { renderTestSpecCell, renderFailingTestCasesCell } from "./col-renderer";

const renderId = (params: GridRenderCellParams<any, string>) => {
    const id = params.value ?? '';

    return (
        <MuiLink
            href={`/items/${encodeURIComponent(id)}`} // ← Completely neutral route
            underline="hover"
            color="primary"
            sx={{
                fontFamily: 'monospace',
                fontWeight: 500,
                cursor: 'pointer',
            }}
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                if (!e.ctrlKey && !e.metaKey) {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                }
            }}
            target="_blank"
            rel="noopener noreferrer"
        >
            {id}
        </MuiLink>
    );
};

export const columns = [
    {
        field: 'id',
        headerName: 'ID',
        width: 140,
        renderCell: renderId,
        renderHeader: () => (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
                height: '100%',
                py: 0.5
            }}>
                <Typography variant="body2" fontWeight={600} sx={{ lineHeight: 1.2 }}>
                    ID
                </Typography>
                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                        fontSize: '10px',
                        lineHeight: 1,
                        mt: 0.3
                    }}
                >
                    CTRL+click | middle-mouse-click
                </Typography>
            </Box>
        ),
    },
    { field: 'status', headerName: 'Status', width: 120 },
    {
        field: 'description',
        headerName: 'Description',
        width: 460,
        valueGetter: (_: any, row: any) => row.text,
    },
    { field: 'version', headerName: 'Version', width: 100 },
    {
        field: 'tags',
        headerName: 'Tags',
        width: 150,
        valueGetter: (_: any, row: any) =>
            Array.isArray(row.categories) ? row.categories.join(', ') : '',
    },
    {
        field: 'verification',
        headerName: 'Verification',
        width: 145,
        valueGetter: (_: any, row: any) => row.test_spec,
        renderCell: renderTestSpecCell,
    },
    {
        field: 'tests_ready',
        headerName: 'Tests Ready',
        width: 135,
        valueGetter: (_: any, row: any) => row.test_implemented,
    },
    {
        field: 'valid_tcs',
        headerName: 'Valid TCs',
        width: 100,
        type: 'number',
        valueGetter: (_: any, row: any) => row.positive_tcs,
    },
    {
        field: 'valid_impl',
        headerName: 'Valid Impl.',
        width: 105,
        type: 'number',
        valueGetter: (_: any, row: any) => row.positive_tcs_implemented,
    },
    {
        field: 'edge_tcs',
        headerName: 'Edge TCs',
        width: 100,
        type: 'number',
        valueGetter: (_: any, row: any) => row.negative_tcs,
    },
    {
        field: 'edge_impl',
        headerName: 'Edge Impl.',
        width: 105,
        type: 'number',
        valueGetter: (_: any, row: any) => row.negative_tcs_implemented,
    },
    {
        field: 'valid_exec',
        headerName: 'Valid Exec.',
        width: 105,
        type: 'number',
        valueGetter: (_: any, row: any) => row.positive_tcs_executed,
    },
    {
        field: 'valid_fail',
        headerName: 'Valid Fail',
        width: 100,
        type: 'number',
        valueGetter: (_: any, row: any) => row.positive_tcs_failing,
        renderCell: renderFailingTestCasesCell,
    },
    {
        field: 'edge_exec',
        headerName: 'Edge Exec.',
        width: 105,
        type: 'number',
        valueGetter: (_: any, row: any) => row.negative_tcs_executed,
    },
    {
        field: 'edge_fail',
        headerName: 'Edge Fail',
        width: 100,
        type: 'number',
        valueGetter: (_: any, row: any) => row.negative_tcs_failing,
        renderCell: renderFailingTestCasesCell,
    },
    {
        field: 'created',
        headerName: 'Created',
        width: 160,
        valueGetter: (_: any, row: any) => row.created_at,
    },
    {
        field: 'updated',
        headerName: 'Updated',
        width: 160,
        valueGetter: (_: any, row: any) => row.updated_at,
    },
] as const;
