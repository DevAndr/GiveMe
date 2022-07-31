import {NextPage} from "next";
import Head from "next/head";
import MainLayout from "../components/layouts/MainLayout";
import React, {useRef, useState, MouseEvent} from "react";
import {Splitter, SplitterPanel} from "primereact/splitter";
import {DataScroller} from "primereact/datascroller";
import {Button} from "primereact/button";
import MultiCheckbox from "../components/multi-chekbox";
import {ConfirmPopup, confirmPopup} from "primereact/confirmpopup";
import {Toast} from "primereact/toast";
import {InputText} from "primereact/inputtext";
import {Toolbar} from "primereact/toolbar";
import {DataTable, DataTableSelectionChangeParams} from "primereact/datatable";
import {Column} from "primereact/column";
import {Tag} from 'primereact/tag';
import {Chips} from "primereact/chips";
import ProductDialog from "../components/dialogs/ProductDialog";
import {InputTextarea} from "primereact/inputtextarea";

const dataTable = {
    data: [
        {
            id: 1000,
            name: "Сладости",
            count: 3
        },
        {
            id: 1001,
            name: "Шмотки",
            count: 12
        },
        {
            id: 1003,
            name: "Для секс игр",
            count: 22
        },
    ]
}

const dataListTemp =
    [
        {
            id: 1000,
            name: "Сникерс",
            description: "wgifusjoivj waierjf iergj eirjg [er fddfgadjas  erjgerf jf i iwer Snbasdfbws ekrbf hreogih",
            count: 3
        },
        {
            id: 1001,
            name: "убуба",
            description: "wgifusjoivj waierjf iergj eirjg [er",
            labels: [
                "Hot", "Cool", "Yep", "Yep", "Happy"
            ],
            count: 12
        },
        {
            id: 1003,
            name: "Киндер",
            description: "wgifusjoivj waierjf iergj eirjg [er",
            labels: [
                "Хочу"
            ],
            count: 22
        },
    ]


const EditList: NextPage = () => {
    const [selectedCustomers, setSelectedCustomers] = useState(null);
    const [visible, setVisible] = useState<boolean>(false);
    const [showDialog, setShowDialog] = useState(false)
    const [dataList, setDataList] = useState(dataListTemp)
    const [selectedProducts, setSelectedProducts] = useState([])
    const [value2, setValue2] = useState('');
    const toast = useRef(null);

    const accept = () => {
        toast?.current.show({severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000});
    };

    const reject = () => {
        toast?.current.show({severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000});
    };

    const confirm = (event: MouseEvent<HTMLElement>) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Do you want to delete this record?',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept,
            reject
        });
    };

    const itemTemplate = (data: any) => {
        return (
            <div id="item"
                 className="flex align-items-center p-2 w-full justify-content-between hover:text-primary hover:bg-black-alpha-10">
                <ConfirmPopup/>
                <div id="item-title" className="product-detail">
                    <div className="text-base font-bold">{data.name}</div>
                </div>
                <div className="flex flex-column align-items-end">
                    <MultiCheckbox/>
                    <br/>
                    <Button icon="pi pi-times"
                            className="p-button-rounded p-button-help p-button-outlined w-2rem h-2rem"
                            aria-label="Cancel" onClick={confirm}/>

                </div>
                <ConfirmPopup target={document.getElementById('item-title')} visible={visible}
                              onHide={() => setVisible(false)} message="Are you sure you want to proceed?"
                              icon="pi pi-exclamation-triangle" accept={accept} reject={reject}/>
            </div>
        );
    }

    const leftToolbarTemplate = () => {
        return (
            <>
                <Button label="Добавить" icon="pi pi-plus" className="p-button mr-2 p-button-sm"
                        onClick={handleAddProduct}/>
                <Button label="Удалить" icon="pi pi-trash" className="p-button-danger p-button-sm"/>
            </>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <>
                <Button label="Копировать ссылку" icon="pi pi-clone p-button-sm" className="p-button p-button-sm"/>
            </>
        )
    }

    const actionBodyTemplate = (rowData: any) => {
        return (
            <>
                <Button type="button" icon="pi pi-pencil" className="p-button-sm"/>
            </>
        );
    }

    const imageBodyTemplate = (rowData: any) => {
        return <img src={`images/product/${rowData.image}`}
                    onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}
                    alt={rowData.image} className="product-image"/>
    }

    const labelBodyTemplate = (rowData: any) => {
        const labels = rowData?.labels
        return <Chips value={labels} max={5} allowDuplicate={false} readOnly className="hover:border-transparent"/>
    }

    const handleAddProduct = () => {
        setShowDialog(true)
    }

    const handleSelectionChange = (e: DataTableSelectionChangeParams) => {
        if (e.type === 'checkbox' || e.type === 'all') {
            setSelectedProducts(e.value)
        }
    }

    const inputTextEditor = (props, field) => {
        return <InputText type="text" value={props.rowData[field]}
                          onChange={(e) => props.editorCallback(e.target.value)}/>;
    }

    const nameEditor = (props) => {
        return inputTextEditor(props, 'name');
    }

    const descriptionEditor = (options) => {
        return  <InputTextarea value={options.value} onChange={(e) => options.editorCallback(e.target.value)} rows={5} cols={30} />
    }

    const labelsEditor = (options) => {
        return <Chips value={options.value} onChange={(e) => options.editorCallback(e.target.value)}/>
    }

    const onEditorValueChange = (props, value) => {
        let updatedProducts = [...props.value];
        updatedProducts[props.rowIndex][props.field] = value;
        setDataList(updatedProducts);
    }

    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    }

    const handleRowEditComplete = (e) => {
        let _dataList = [...dataList];
        let {newData, index} = e;

        _dataList[index] = newData;

        setDataList(_dataList);
    }

    return (
        <>
            <Head>
                <title>Give Me: Управление списком</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <MainLayout>
                <Toast ref={toast} position="bottom-right"/>
                <div className="card justify-content-between w-full h-screen">
                    <Splitter className="mb-5 w-full h-full">
                        <SplitterPanel className="flex align-items-center justify-content-center" size={20}
                                       minSize={10}>
                            <div className="w-full align-self-baseline">
                                <DataScroller className="w-full" value={dataTable.data} itemTemplate={itemTemplate}
                                              rows={10} inline scrollHeight="500px"/>
                            </div>
                        </SplitterPanel>
                        <SplitterPanel className="flex" size={80} minSize={60}>
                            <div className="flex flex-column align-self-baseline p-5 w-full">
                                <div className="grid p-fluid">
                                        <span className="p-float-label w-full">
                                            <InputText id="name-list" className="font-medium" value={value2}
                                                       onChange={(e) => setValue2(e.target.value)}/>
                                            <label htmlFor="name-list">Имя списка</label>
                                        </span>
                                </div>
                                {/*<div className="grid p-fluid absolute bottom-0">*/}
                                {/*    <div className="mt-4 w-full">*/}
                                {/*        <div className="p-inputgroup">*/}
                                {/*        <span className="p-inputgroup-addon">*/}
                                {/*            <i className="pi pi-link"></i>*/}
                                {/*        </span>*/}
                                {/*            <InputText placeholder="Ссылка на товар"/>*/}
                                {/*            <Button label="Добавить"/>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                <div className="w-full h-full mt-4 mb-4">
                                    <DataTable editMode="row"
                                               dataKey="id"
                                               resizableColumns
                                               value={dataList}
                                               selection={selectedProducts}
                                               onSelectionChange={handleSelectionChange}
                                               onRowEditComplete={handleRowEditComplete}
                                               breakpoint="640px"
                                               size="normal" responsiveLayout="stack">
                                        <Column selectionMode="multiple" headerStyle={{width: '1rem'}} exportable={false}/>
                                        <Column field="img" headerStyle={{width: '1rem'}} body={imageBodyTemplate}/>
                                        <Column field="name" bodyStyle={{fontWeight: 500}}  editor={nameEditor} header="Имя" sortable/>
                                        <Column field="description" header="Описание" editor={descriptionEditor}/>
                                        <Column field="labels" header="Метки" body={labelBodyTemplate} editor={labelsEditor}/>
                                        <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}/>
                                    </DataTable>
                                </div>
                                <div className="flex align-items-center justify-content-between flex-column bottom-0">
                                    <Toolbar className="w-full p-2" left={leftToolbarTemplate}
                                             right={rightToolbarTemplate}/>
                                </div>
                            </div>
                            <ProductDialog visible={showDialog} onHide={() => {
                                setShowDialog(false)
                            }}/>
                        </SplitterPanel>
                    </Splitter>
                </div>
            </MainLayout>
        </>
    )
}

export default EditList
