/**
 * API错误名称
 */
let ApiErrorNames = {}

ApiErrorNames.UNKNOW_ERROR = 'unknowError'
ApiErrorNames.PARAMS_ERROR = 'paramsError'
ApiErrorNames.RESOURCES_EXIST = 'resourcesExist'
ApiErrorNames.USER_NOT_PERMISSIONS = 'userNotPermissions'
ApiErrorNames.RESOURCES_NOT_EXIST = 'resourcesNotExist'
ApiErrorNames.SERVER_ERROR = 'serverError'
ApiErrorNames.INVALID_CODE = 'invalidCode'

/**
 * API错误名称对应的错误信息
 */
const error_map = new Map()

// error_map.set(ApiErrorNames.UNKNOW_ERROR, { status:200, message: '未知错误' })
error_map.set(ApiErrorNames.PARAMS_ERROR, { status:400, message: 'Request parameter is wrong' })
error_map.set(ApiErrorNames.RESOURCES_EXIST, { status:400, message: 'Data already exists' })
error_map.set(ApiErrorNames.USER_NOT_PERMISSIONS, { status:401, message: 'User has no permissions' })
error_map.set(ApiErrorNames.RESOURCES_NOT_EXIST, { status:404, message: 'There is no resources' })
error_map.set(ApiErrorNames.SERVER_ERROR, { status:500, message: 'Internal Server Error' })
error_map.set(ApiErrorNames.INVALID_CODE, { status:400, message: '验证码错误' })

//根据错误名称获取错误信息
ApiErrorNames.getErrorInfo = (error_name) => {

	let error_info

	if (error_name) {
		error_info = error_map.get(error_name)
	}

	//如果没有对应的错误信息，默认'未知错误'
	if (!error_info) {
		error_name = ApiErrorNames.UNKNOW_ERROR
		error_info = error_map.get(error_name)
	}

	return error_info
}

module.exports = ApiErrorNames
