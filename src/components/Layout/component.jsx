import * as React from 'react'
import { Layout } from 'react-admin'
import CustomAppBar from '@/components/AppBar'

const MyLayout = (props) => <Layout {...props} appBar={CustomAppBar} />

export default MyLayout
