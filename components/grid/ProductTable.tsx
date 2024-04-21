import React, {FC} from 'react';
import {Column} from 'primereact/column';
import {DataTable} from 'primereact/datatable';
import {InputTextarea} from 'primereact/inputtextarea';
import MarketPlace from '@/components/market/MarketPlace';
import {InputText} from 'primereact/inputtext';
import { Image } from 'primereact/image';

interface ProductTableProps {
    selections: any[]
    value?: any[]
}

const ProductTable: FC<ProductTableProps> = ({selections, value}) => {
    const handleSelectionChange = (e: any) => {
        if (e.type === 'checkbox' || e.type === 'all') {
            setSelectedProducts(e.value)
        }
    }

    const handleRowEditComplete = async (e) => {
        let {newData, index} = e
        await updateProduct(newData.uidWishList, newData)

        // refetchProducts({uidWishList: currentWishList.uid})
    }

    const imageBodyTemplate = (rowData: any) => {
        console.log(rowData.img)

        // return <Image src={rowData.img} alt={'photo'} width={'96'} height={'96'}/>
        return <img src={rowData.img}
                    onError={(e: any) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}
                    alt={rowData.image} className="w-4rem"/>
    }

    const inputTextEditor = (props, field) => {
        return <InputText className="w-full" type="text" value={props.rowData[field]}
                          onChange={(e) => props.editorCallback(e.target.value)}/>;
    }

    const nameEditor = (props) => {
        return inputTextEditor(props, 'name');
    }

    const descriptionEditor = (options) => {
        return <InputTextarea className="w-full" value={options.value}
                              onChange={(e) => options.editorCallback(e.target.value)} rows={5}
                              cols={30}/>
    }

    const marketTypeTemplate = (rowData: any) => {
        return <MarketPlace type={rowData.marketPlace}/>
    }

    return (
        <DataTable editMode="row"
                   dataKey="uid"
                   resizableColumns emptyMessage={'Нет товаров в списке'}
                   value={value} paginator rows={10} first={0}
                   selection={selections}
                   onSelectionChange={handleSelectionChange}
                   onRowEditComplete={handleRowEditComplete}
                   scrollable scrollHeight="flex" responsiveLayout="scroll"
                   className="table-products" size="small">
            <Column selectionMode="multiple" headerStyle={{width: '.1rem'}}
                    exportable={false} style={{flex: '3rem 0 0'}}/>
            <Column field="img" body={imageBodyTemplate}
                    style={{flex: '0 0 8rem'}}/>
            <Column field="name" bodyStyle={{fontWeight: 500}} editor={nameEditor}
                    header="Имя" sortable style={{flex: '0 0 10rem'}}/>
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