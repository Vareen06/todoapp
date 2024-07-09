import React from 'react'
import { useState } from 'react';
import bin from './bin.png'
import pencil from './pencil.png'

export default function ToDo () {
    const [state,setState]= useState('');
    const [tableData,setTableData]=useState([]);
    const [updateItem,setUpdateItem]= useState({isUpdate:false , index:null});

    const handleinputchange=(e)=>{
        setState(e.target.value);
    }

    const addItem=(index)=>{
        if(updateItem.isUpdate){
            const updatedValue= [...tableData];
            updatedValue.splice(updateItem.index,1,state);
            setTableData(updatedValue);
            setState('');
            setUpdateItem({
                isUpdate:false,
                index:null
            })
        }
        else{
            setTableData([...tableData,state]);
            setState('');
        }
    }

    const deleteItem=(index)=>{
        setTableData(tableData.filter((item,i)=> i !== index))
        setState('')
    }

    const updateText=(index,item)=>{
        setUpdateItem({
            isUpdate:true,
            index: index
        })
        setState(item)
    }
  
    return (
        <div className='bg-gray-400 min-h-screen'>
            <div className='flex flex-col items-center py-20'>
            <h1 className='text-black text-lg p-2 bg-green-300 rounded-2xl'>TO DO :</h1>
            <br/>
            <div className='flex items-center w-full max-w-lg'>
                <input className='mt-5 p-2 border rounded w-full mr-2' type='text' value={state} onChange={handleinputchange}
                placeholder='Enter the text' ></input>
                <button className='bg-slate-700 text-white p-2 rounded-2xl mt-5' type='button' id='add' onClick={()=>addItem()}>Addtext</button>
            </div>
            <br/>
            <table className='text-lg w-full max-w-3xl' id='table'>
                <tr>
                    <th className='text-black text-lg p-2 bg-yellow-400 rounded-2xl'>Items</th>
                </tr>
                <tbody>
                {tableData.map((item,index)=>(
                    <tr key={index} className='bg-gray-100 h-1/4 rounded-lg mb-2'> 
                    <td className='p-4 border-b border-gray-200'>
                        {item}
                    </td>
                  
                        <td className='p-2 border-b border-gray-200 flex justify-end align-center'>
                            <button className='bg-red-700 text-white p-1 rounded-2xl mx-4'type='button' onClick={()=>deleteItem(index)} ><img src={bin} alt='delete' className='w-10 h-10'/></button>
                        
                            <button className={`p-1 rounded-2xl ${updateItem.index===index?' bg-gray-400 text-gray-700': 'bg-blue-300 text-white'} mx-4`} disabled={updateItem.index===index} onClick={()=>updateText(index,item)}  type='button'  
                            ><img src={pencil} alt='update' className='w-10 h-10'/></button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <script src="https://cdn.tailwindcss.com"></script>
        </div>
    </div>
  )
}
