import React, {FC} from 'react';
import {Column} from 'primereact/column';
import {DataTable} from 'primereact/datatable';
import {InputTextarea} from 'primereact/inputtextarea';
import MarketPlace from '@/components/market/MarketPlace';
import {InputText} from 'primereact/inputtext';
import {useUpdateEditorProducts} from '@/graphql';
import Image from 'next/image';

interface ProductTableProps {
    selections: any[];
    value?: any[];
    onSelectionChange: (e: any) => void;
}

const ProductTable: FC<ProductTableProps> = ({selections, value, onSelectionChange}) => {
    const updateProduct = useUpdateEditorProducts()

    const handleRowEditComplete = async (e) => {
        let {newData, index} = e;
        await updateProduct(newData.idWishList, newData);
    };

    const imageBodyTemplate = (rowData: any) => {
        return <Image src={rowData.img} alt={rowData.name} className="w-4rem object-contain" width={96} height={96}  
        onError={(e: any) => e.target.src = '/images/placeholder.png'}/> 
    };

    const nameBodyTemplate = (rowData: any) => {
        return <div className={`text-balance${rowData.staus === 'COMPLETED' ? ' line-through' : ''}`}>
            {rowData.name}
        </div>
    }

    const inputTextEditor = (props, field) => {
        return <InputText className="w-full" type="text" value={props.rowData[field]}
                          onChange={(e) => props.editorCallback(e.target.value)}/>;
    };

    const nameEditor = (props) => {
        return inputTextEditor(props, 'name');
    };

    const descriptionEditor = (options) => {
        return <InputTextarea className="w-full" value={options.value}
                              onChange={(e) => options.editorCallback(e.target.value)} rows={5}
                              cols={30}/>;
    };

    const marketTypeTemplate = (rowData: any) => {
        return <MarketPlace type={rowData.marketPlace}/>;
    };

    const isRowSelectable = (event) => {
        return (event.data ? event.data.status !== 'COMPLETED' : true)
    };

    return (
        <DataTable editMode="row"
                   dataKey="id"
                   resizableColumns emptyMessage={'Нет товаров в списке'}
                   value={value} paginator rows={5} first={0}
                   selection={selections}
                   // isDataSelectable={isRowSelectable}
                   onSelectionChange={onSelectionChange}
                   onRowEditComplete={handleRowEditComplete}
                   scrollable scrollHeight="flex"
                   className="table-products" size="small">
            <Column selectionMode="multiple" headerStyle={{width: '.1rem'}}
                    exportable={false} style={{flex: '3rem 0 0'}}/>
            <Column field="img" body={imageBodyTemplate}
                    style={{flex: '0 0 8rem'}}/>
            <Column field="name" bodyStyle={{fontWeight: 500}} editor={nameEditor}
                    header="Имя" sortable style={{flex: '0 0 10rem'}} body={nameBodyTemplate}/>
            <Column field="description" header="Описание"
                    editor={descriptionEditor}/>
            <Column field="marketPlace" header="Магазин" body={marketTypeTemplate}
                    style={{flex: '0 0 8rem'}} headerStyle={{width: '.1rem'}}/>
            <Column rowEditor headerStyle={{width: '1rem'}}
                    bodyStyle={{textAlign: 'center'}}/>
        </DataTable>
    );
};

export default ProductTable;